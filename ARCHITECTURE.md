# GramGo — System Architecture & Cloud Infrastructure Optimization Guide ☁️

This document serves as the authoritative Google Cloud Architecture & FinOps (Cost Optimization) Guide for **GramGo**. It validates all connected services, API token management, database connections, and cost-control configurations.

---

## 🏛️ 1. High-Level Architecture Overview

GramGo is architected as a decoupled Single Page Application (SPA) with a stateless Node.js/Express REST API container, Cloud SQL PostgreSQL database, Firebase Auth, and Google Gemini AI API integration.

```mermaid
flowchart TB
    subgraph Client_Layer ["1. Client & Presentation Layer"]
        SPA["React 19 + Vite SPA<br>(Deployed on Firebase Hosting CDN)"]
        ClientAuth["Firebase Web Auth SDK<br>(Google OAuth & Email/Password)"]
        SPA --> ClientAuth
    end

    subgraph CDN_Hosting ["2. Edge & CDN Layer"]
        FirebaseHosting["Firebase Hosting CDN<br>(gramgo.web.app / Always Free Tier)"]
        FirebaseHosting -.->|Serves Static JS/CSS| SPA
    end

    subgraph API_Layer ["3. Application API Layer (Stateless Container)"]
        CloudRun["Google Cloud Run (gogram-api)<br>• min-instances: 0 (Scales to 0 when idle)<br>• memory: 512Mi | cpu: 1<br>• concurrency: 80 | cpu-throttled"]
        Express["Express.js REST API"]
        FirebaseAdmin["Firebase Admin SDK<br>(Token Verification)"]
        
        CloudRun --> Express
        Express --> FirebaseAdmin
    end

    subgraph Data_Layer ["4. Managed Database & Third-Party APIs"]
        CloudSQL["Google Cloud SQL (PostgreSQL)<br>• Edition: Enterprise (Standard)<br>• Machine: db-f1-micro / db-custom-1-3840<br>• Storage: 10-20 GB SSD | Data Cache: Disabled"]
        GeminiAPI["Google Gemini AI API<br>(@google/generative-ai)<br>• Model: gemini-1.5-flash / gemini-2.0-flash<br>• Token Cost: ~$0.075 / 1M input tokens"]
        StripeAPI["Stripe Payment Gateway<br>(Webhooks / Checkout Sessions)"]
    end

    %% Connections
    SPA ==>|HTTPS API Requests / JSON| CloudRun
    ClientAuth -.->|ID Tokens| Express
    Express ==>|Unix Domain Socket (/cloudsql/...)| CloudSQL
    Express ==>|REST API / Token Auth| GeminiAPI
    Express ==>|Webhook Signatures| StripeAPI
```

---

## 🔌 2. Service Validation & Connection Specifications

### A. Google Cloud SQL (PostgreSQL Database)
* **Instance ID**: `gogram-db`
* **Database Name**: `gogram`
* **Connection Routing**:
  * **Production (Cloud Run)**: Unix Domain Socket (`/cloudsql/gogram-web-2026:asia-southeast1:gogram-db/.s.PGSQL.5432`) without SSL negotiation overhead (`ssl: false`).
  * **Local Development**: TCP (`34.126.85.240:5432`) with SSL enabled (`ssl: { rejectUnauthorized: false }`).
* **FinOps Optimization Standard**:
  * **Edition**: **Enterprise (Standard)** *(Never provision Enterprise Plus for small/medium workloads)*.
  * **Tier**: **`db-f1-micro`** (Shared vCPU, 0.6 GB RAM) for dev/light prod (~$10/mo), or **`db-custom-1-3840`** (1 vCPU, 3.75 GB RAM) for scaled prod (~$25–$32/mo).
  * **Storage**: 10–20 GB SSD with auto-resize disabled or capped at 50 GB.
  * **Data Cache (NVMe)**: **Disabled** *(Gogram's entire dataset <50MB fits 100% inside standard PostgreSQL RAM buffers)*.

---

### B. Google Cloud Run (Node.js / Express API Container)
* **Service Name**: `gogram-api`
* **Region**: `asia-southeast1` (Singapore)
* **FinOps Optimization Standard**:
  * `--min-instances 0`: Container scales down to zero when there is no traffic (**$0.00 base charge** when idle).
  * `--max-instances 5`: Prevents runaway billing during DDOS or unexpected traffic spikes.
  * `--cpu-throttling`: CPU is allocated only during active HTTP request handling.
  * `--memory 512Mi` / `--cpu 1`: Lightweight container footprint.
  * `--concurrency 80`: Up to 80 concurrent HTTP requests handled per container instance.
  * **Instant Port Binding**: Entrypoint (`server/index.js`) executes `app.listen(PORT)` immediately upon process start so GCP container health probes (`PORT=8080`) pass in under 2 seconds.

---

### C. Google Gemini AI API (`GEMINI_API_KEY`)
* **Role**: Automated curriculum question generation (Grammar, Vocabulary, and 5-part continuous story dialogues for Conversation) in offline scripts (`server/scripts/generate_all_questions.js`) and CMS Admin generator (`src/pages/admin/AiDraftSection.jsx`).
* **FinOps & Token Optimization Standard**:
  * **Model Selection**: Standardize strictly on **`gemini-1.5-flash`** or **`gemini-2.0-flash`** (up to **10x cheaper** per 1M tokens than Pro models while providing faster response latency).
  * **Structured JSON Output**: Use explicit `responseSchema` / `responseMimeType: "application/json"` to avoid failed JSON parse attempts and wasted token retries.
  * **Prompt Compression**: Remove conversational preambles ("Sure, here are your questions:"). Ensure prompts ask directly for the array output.
  * **Caching Strategy**: Generated questions are committed directly to PostgreSQL (`questions` table) or stored in static fallbacks (`src/data/conversationQuestions.js`), eliminating repetitive runtime AI calls.

---

### D. Firebase Hosting & Firebase Authentication
* **Role**: Global CDN distribution for SPA static files (`dist/`) and user authentication.
* **FinOps Optimization Standard**:
  * **Always Free Tier**: 10 GB storage free + 360 MB/day data transfer free (**$0.00/month**).
  * Static asset caching headers configured for max performance.

---

### E. Google Cloud Build (CI/CD Pipeline)
* **Role**: Automated container compilation on git commits.
* **FinOps Optimization Standard**:
  * Build trigger filtered using `Included files: server/**` so frontend-only edits, styling changes, or documentation edits never trigger paid container build minutes.

---

## 💰 3. Master Infrastructure Cost Comparison Table

| Service Component | Default / Over-provisioned Setting | **Gogram FinOps Optimized Setting** | Monthly Cost Impact |
|---|---|---|---|
| **Google Cloud SQL** | Enterprise Plus (8 vCPU / 64 GB RAM) | **Enterprise Edition (`db-f1-micro` / `db-custom-1-3840`)** | **~$10.00 – $32.00 / mo** *(Saved ~$460/mo)* |
| **Google Cloud Run** | Always-on min instances (>0) | **`--min-instances 0` `--cpu-throttling`** | **$0.00 / mo** (Free tier when idle) |
| **Firebase Hosting** | Standard Hosting | **Global CDN SPA Deployment** | **$0.00 / mo** (Free tier) |
| **Google Gemini API** | Gemini Pro (1.0 / 1.5 Pro) | **`gemini-1.5-flash` / `gemini-2.0-flash`** | **<$1.00 / mo** (Pennies for bulk batch generation) |
| **Cloud Build** | Unfiltered build trigger | **Filtered path trigger (`server/**`)** | **$0.00 / mo** (Within 120 free build mins/day) |
| **TOTAL ESTIMATED COST** | **~$500.00+ / month** | **~$10.00 – $32.00 / month** | **Over 94% Total Savings** |

---

## 🚀 4. Deployment Verification & Maintenance Script

To deploy all optimized services to production cleanly:

```bash
# Run automated deployment script (Builds assets, pushes to GitHub, deploys Firebase & Cloud Run)
./deploy.sh "deploy: cost-optimized production release"
```
