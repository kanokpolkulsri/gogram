#!/bin/bash
# Prepend local bin path to ensure Node/NPM/NPX executables are found in all shell environments
export PATH="/Users/tonpalmknp/.local/bin:/opt/homebrew/bin:/opt/homebrew/share/google-cloud-sdk/bin:$PATH"

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

echo "=== 5. Deploying Backend API to Google Cloud Run ==="
echo "Building container and deploying (this may take a few minutes)..."
gcloud run deploy gogram-api --source ./server --platform managed --region asia-southeast1 --allow-unauthenticated --project gogram-web-2026 > gcloud_deploy.log 2>&1
DEPLOY_STATUS=$?
if [ $DEPLOY_STATUS -ne 0 ]; then
  cat gcloud_deploy.log
  rm -f gcloud_deploy.log
  echo "❌ Cloud Run deployment failed"
  exit 1
fi
cat gcloud_deploy.log | grep -v -E "Creating Revision|Routing traffic|Preparing container|Uploading sources|Building Container|Setting IAM Policy"
rm -f gcloud_deploy.log

echo "=== 🚀 Success! Site live at: https://gramgo.web.app ==="
