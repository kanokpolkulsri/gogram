# Gogram — English Language Learning Platform

Gogram is an educational web application designed for Thai learners to study English grammar, vocabulary, and reading comprehension. 

This project consists of a **React + Vite** frontend and an **Express.js (Node.js)** backend connected to a **PostgreSQL (Google Cloud SQL)** database.

---

## 🛠️ Prerequisites

To run this application locally, you must have the following installed:
1. **Node.js** (v18 or higher) & **npm**
2. **PostgreSQL** database server running locally on port `5432`

---

## 🚀 How to Run Locally

### 1. Configure the Database Connection
Create a `.env` file inside the `server/` directory:
```bash
cp server/.env.example server/.env  # Or edit the template server/.env directly
```
Ensure the `DATABASE_URL` matches your local PostgreSQL configuration:
```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/gogram
```

### 2. Initialize and Seed the Database
Make sure you have started your local PostgreSQL server and created an empty database named `gogram`. Then, run the migration and seeding script:
```bash
# Seed default categories, units, and quiz questions
npm run seed --prefix server
```

### 3. Start Frontend and Backend Concurrently
We use `concurrently` to launch the Vite frontend and Express server with a single command from the root directory:
```bash
# Runs frontend on port 5173 and backend on port 5000
npm run dev
```

*   **Vite Web App**: `http://localhost:5173`
*   **Express API Server**: `http://localhost:5000`

---

## 📐 System Architecture & Diagrams

### System Architecture & Technology Stack

This diagram visualizes how the frontend app, backend API server, local development tools, third-party services, and deployment hosting layers interact within Gogram.

```mermaid
flowchart TB
    %% Subgraphs for layers
    subgraph presentation_layer ["1. Presentation Layer (Frontend App)"]
        React["React 19 / Vite"]
        Router["React Router DOM v7"]
        FirebaseWebSDK["Firebase Web SDK"]
        UserStore["Custom userStore Context"]
        
        React --> Router
        React --> UserStore
        UserStore --> FirebaseWebSDK
    end

    subgraph hosting_infrastructure ["2. Hosting & Deployment Environments"]
        FirebaseHosting["Firebase Hosting<br>(gogram-web-2026.web.app)"]
        CloudRun["Google Cloud Run<br>(gogram-api Service)"]
    end

    subgraph application_layer ["3. Application Layer (Backend Express Server)"]
        NodeJS["Node.js Runtime"]
        Express["Express.js App Router"]
        FirebaseAdminSDK["Firebase Admin SDK"]
        StripeNodeSDK["Stripe Node SDK"]
        PgPool["pg Client Pool (PostgreSQL)"]
        
        NodeJS --> Express
        Express --> FirebaseAdminSDK
        Express --> StripeNodeSDK
        Express --> PgPool
    end

    subgraph local_tunnelling ["4. Local Development Tools"]
        SqlProxy["Cloud SQL Auth Proxy<br>(Port 5432 / TLS Auth Tunnel)"]
    end

    subgraph database_and_services ["5. Database, Auth & Third-Party APIs"]
        CloudSQL["Google Cloud SQL (PostgreSQL)"]
        FirebaseAuth["Firebase Authentication"]
        StripeAPI["Stripe API Payment Gateway"]
    end

    %% Connections
    FirebaseHosting -.->|Serves Static Files| React
    
    React -->|HTTP Requests / Bearer Token| CloudRun
    CloudRun -->|Runs Express Server| Express
    
    FirebaseWebSDK -->|Google Sign-In Auth| FirebaseAuth
    FirebaseAdminSDK -->|Token Verification API| FirebaseAuth
    
    StripeNodeSDK -->|Create PromptPay Session| StripeAPI
    
    PgPool -->|Local TCP Queries| SqlProxy
    SqlProxy ==>|Secure TLS / IAM Auth Tunnel| CloudSQL
    PgPool ==>|Production Direct Connection| CloudSQL
```

### UML Sequence Diagram (Authentication & Data Lifecycle)
This sequence diagram demonstrates the flow of authentication token verification and SQL queries on page load or user sign-in.

```mermaid
sequenceDiagram
    participant Learner as Learner (Browser)
    participant Front as Frontend App (Vite - Port 5173)
    participant Auth as Firebase Authentication
    participant Back as Backend API (Express - Port 5001)
    participant Proxy as Cloud SQL Auth Proxy (Local Port 5432)
    participant DB as Google Cloud SQL (PostgreSQL)

    %% Authentication Flow
    Learner->>Front: Click "I'M READY" / Login
    Front->>Auth: signInWithPopup(Google)
    Auth-->>Front: Return Firebase ID Token
    Front->>Back: POST /api/auth/sync (Bearer Token)
    Back->>Auth: Verify ID Token (Firebase Admin SDK)
    Auth-->>Back: Token Valid (Decoded UID & Name)

    %% Database Sync & Query Flow
    Back->>Proxy: Read/Write query (Port 5432)
    Proxy->>DB: Secure TLS Tunnel (IAM Verified)
    DB-->>Proxy: Return database rows
    Proxy-->>Back: Return database rows
    Back-->>Front: Return active learner profile
    Front-->>Learner: Display Dashboard & Learning Map
```

---

## 🔒 Local Database Setup via Cloud SQL Auth Proxy

To bypass Google Cloud SQL IP whitelist firewall rules dynamically, local development uses the **Cloud SQL Auth Proxy** to tunnel database traffic over secure TLS/IAM:

### 1. Install Google Cloud SDK (gcloud CLI)
If you don't have the `gcloud` CLI installed, install it via Homebrew:
```bash
brew install --cask google-cloud-sdk
```

### 2. Authenticate Your Machine
Run a one-time login command in your terminal to authenticate your computer with your Google Cloud account credentials:
```bash
gcloud auth application-default login
```
*(This sets up your Application Default Credentials (ADC) which the proxy reads to build the secure tunnel).*

### 3. Run the Development Server
From the root directory, simply start the development server as usual:
```bash
npm run dev
```
This runs the Vite web app, the Express.js server, and launches the `cloud-sql-proxy` concurrently. Your backend will seamlessly connect to the Cloud SQL instance through the tunnel on `127.0.0.1:5432`.

---

## ☁️ Google Cloud Deployment

### Redeploying Frontend (Firebase Hosting)
To push frontend updates live, run:
```bash
# 1. Build optimized static assets
npm run build

# 2. Deploy to Firebase Hosting
npx -y firebase-tools@latest deploy --only hosting
```

### Deploying Backend (Google Cloud Run)
To push backend server updates live:
1. Provision a Google Cloud SQL (PostgreSQL) instance.
2. Deploy the `/server` directory to **Google Cloud Run** using `gcloud run deploy`.
3. Set up a database connection binding and inject the `DATABASE_URL` env variable in the Cloud Run configuration panel.
4. Update the `BASE_URL` in [src/data/api.js](file:///Users/tonpalmknp/Documents/gogram/src/data/api.js) to point to your new Cloud Run URL.
