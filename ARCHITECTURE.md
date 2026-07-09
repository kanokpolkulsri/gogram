# Gogram — System Architecture & Design Decisions

This document outlines the architectural decisions, design patterns, technology stack, and performance considerations for the Gogram English language learning platform.

---

## 📐 High-Level Architecture

Gogram is split into a **decoupled Client-Server architecture**:
1. **Frontend (Presentation Layer)**: A static single-page application (SPA) running in the user's browser.
2. **Backend (Application API Layer)**: A containerized Express.js server running in a serverless environment.
3. **Database (Storage Layer)**: A fully managed relational database.

---

## 🛠️ Technology Stack & Tooling

### 1. Frontend UI & State
*   **React 19 & Vite**: Provides extremely fast local hot-reloading during development and builds highly optimized static production assets.
*   **React Router DOM v7**: Handles client-side routing dynamically without requiring server-side page reloads.
*   **Firebase Web SDK**: Authenticates users client-side using Google Sign-In.
*   **Custom React userStore (Context)**: Manages local learner state (hearts, XP, authentication profile) and triggers API syncing.

### 2. Backend API Server
*   **Node.js & Express.js**: Handles API endpoints (`/api/auth`, `/api/quiz`, `/api/promo`, `/api/payment`, `/api/admin`).
*   **Firebase Admin SDK**: Performs stateless, cryptographic validation of Firebase JWT ID tokens passed from the frontend.
*   **Stripe Node SDK**: Generates secure checkout sessions for PromptPay QR payments and verifies payment status via webhooks.
*   **pg (node-postgres)**: Connects to the PostgreSQL database with database connection pooling.

### 3. Database & Storage
*   **Google Cloud SQL (PostgreSQL)**: A managed SQL engine storing users, levels, quizzes, promo codes, and completed lessons.

### 4. Infrastructure & Hosting
*   **Firebase Hosting**: Hosts static assets (HTML/JS/CSS) on a global CDN.
*   **Google Cloud Run**: Hosts the containerized Express backend server.
*   **Cloud SQL Auth Proxy**: Creates a secure TLS tunnel from the local developer machine to the Google Cloud SQL instance without exposing the database to public IP addresses.

---

## 🧠 Core Architectural Decisions & Rationale

### 1. Separation of Static Assets & API Services
*   **Decision**: Deploy frontend assets to Firebase Hosting and backend code to Cloud Run.
*   **Rationale**: Frontend files do not change on every request and are served instantly from global CDN edge caches. Isolating the backend to Cloud Run allows the server to scale independently based on API request loads.

### 2. Serverless Scale-to-Zero Runtime
*   **Decision**: Deploy the Express backend container to Google Cloud Run.
*   **Rationale**: Cloud Run automatically scales server instances down to **0** when there is no traffic. If the application is idle, you incur **zero running cost**. If traffic spikes, it scales up to multiple instances in seconds.

### 3. Stateless Token Authentication (JWT)
*   **Decision**: Use Firebase OIDC ID Tokens instead of traditional session cookies or stateful server sessions.
*   **Rationale**: 
    1. The frontend retrieves a secure token from Firebase Auth.
    2. The token is sent in the `Authorization: Bearer <token>` header of every API request.
    3. The Express server validates the cryptographic signature of the token locally. No database query or remote network call is needed to check if a user is logged in.

### 4. Unix Domain Sockets for Database Connection
*   **Decision**: Connect Cloud Run to Cloud SQL via a Unix domain socket (`/cloudsql/...`) rather than public IP whitelisting.
*   **Rationale**: Cloud SQL has strict firewall rules. Whitelisting the server's public IP is impossible in a serverless environment because Cloud Run's outbound IP addresses change dynamically. The Unix socket connection mounts a secure local file socket inside the container, keeping all database traffic off the public internet.

### 5. Static Grammar Curriculum Optimization
*   **Decision**: Load the default Grammar category configuration (exactly 75 units, 5 difficulty nodes per unit) statically from mock data on the frontend (`src/data/mockData.js`), completely skipping database unit queries on application entry.
*   **Rationale**: 
    1. Loading 75 units and their corresponding nodes from a relational database can take several seconds and blocks user entry (especially under cold-starts or connection throttling).
    2. Because the Grammar curriculum is static, we cached the structures on the client. Database API requests are only made in parallel when a user starts or completes a specific lesson/quiz, reducing database reads by over 90% and making initial app startup instantaneous.

### 6. Synchronous Checkout Verification to Bypass Webhook Latency
*   **Decision**: Implement a `/verify-session` backend endpoint to synchronously verify Stripe checkout sessions upon return redirection, before fetching the synced user profile.
*   **Rationale**: Stripe webhooks are processed asynchronously and can experience delivery delays. If a user redirects back to Gogram instantly, a race condition occurs where the database does not reflect their new subscription yet. Querying Stripe synchronously via `/verify-session` before running `/auth/sync` guarantees that the database is upgraded and user hearts are set to `infinity` immediately, ensuring a seamless user experience.

---

## ⚡ Performance, Load & Caching Strategies

### 1. Database Connection Pooling
*   **Pattern**: We instantiate a single `pg.Pool` instance shared across all API routes.
*   **Rationale**: Establishing a TCP or Unix socket connection to PostgreSQL takes significant CPU time and memory. The connection pool maintains a pool of pre-established, reuseable connections. When a request comes in, it checks out an existing connection from the pool, runs the query, and releases it instantly.

### 2. Firebase Public Key Caching
*   **Pattern**: The Firebase Admin SDK automatically caches Google's public OIDC certificates.
*   **Rationale**: To verify a JWT signature, the server needs Google's public key. The Admin SDK fetches these keys once and caches them in-memory, ensuring that subsequent API requests are authenticated locally in under 1 millisecond.

### 3. Client-Side Hearts & Subscription Dynamic Computations
*   **Pattern**: Compute hearts refill logic and subscription expiration checks dynamically in the frontend custom hook (`useUser`) and a local browser interval rather than polling backend API endpoints.
*   **Rationale**: 
    1. Polling a backend `/sync` endpoint every 20 seconds to check for heart refills generates massive database-heavy request overhead (3,000+ operations/min per 1,000 active users).
    2. Since subscription expiration and hourly heart recovery (capped at 10 hearts) are completely deterministic, the client's `useUser()` hook calculates them locally using `Date.now()`, the user's base `heartsCount`, and the `lastHeartRefillTime` anchor.
    3. A 30-second local check interval triggers React state updates to reflect natural heart refills on-screen, completely removing background API requests. The server database is updated lazily when the user performs a functional action (e.g. a quiz mistake or completion).

---

## 🔒 Security Architecture

1.  **Transport Security (TLS)**: All client-to-server traffic is encrypted using HTTPS.
2.  **No Exposed Credentials**: Sensitive configuration credentials (like database passwords and Stripe secret keys) are injected into the Cloud Run container runtime as environment variables, keeping them out of git repositories.
3.  **Strict SQL Injection Prevention**: All queries to the PostgreSQL database use parameterized inputs (e.g., `pool.query('SELECT * FROM users WHERE uid = $1', [uid])`), preventing SQL injection attacks entirely.
