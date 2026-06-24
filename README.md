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
