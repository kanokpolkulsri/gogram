#!/bin/bash
# Prepend local bin path to ensure Node/NPM/NPX executables are found in all shell environments
export PATH="/Users/tonpalmknp/.local/bin:$PATH"

echo "=== 1. Building production assets ==="
npm run build || { echo "❌ Build failed"; exit 1; }

echo "=== 2. Pushing code to GitHub ==="
git push origin main || { echo "❌ Git push failed"; exit 1; }

echo "=== 3. Deploying to Firebase Hosting ==="
npx -y firebase-tools@latest deploy --only hosting || { echo "❌ Firebase deployment failed"; exit 1; }

echo "=== 🚀 Success! Site live at: https://gogram-web-2026.web.app ==="
