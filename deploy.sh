#!/bin/bash
# Prepend local bin path to ensure Node/NPM/NPX executables are found in all shell environments
export PATH="/Users/tonpalmknp/.local/bin:$PATH"

echo "=== 1. Committing changes ==="
git add -A
COMMIT_MSG="${1:-deploy: $(date '+%Y-%m-%d %H:%M:%S')}"
git commit -m "$COMMIT_MSG" || echo "ℹ️  Nothing to commit"

echo "=== 2. Building production assets ==="
npm run build || { echo "❌ Build failed"; exit 1; }

echo "=== 3. Pushing code to GitHub ==="
git push origin main || { echo "❌ Git push failed"; exit 1; }

echo "=== 4. Deploying to Firebase Hosting ==="
npx -y firebase-tools@latest deploy --only hosting || { echo "❌ Firebase deployment failed"; exit 1; }

echo "=== 🚀 Success! Site live at: https://gogram-web-2026.web.app ==="
