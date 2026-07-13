#!/bin/bash
# Deploy Busola site to Cloudflare Pages
# Requires the following environment variables:
#   CF_ACCOUNT_ID   - Your Cloudflare Account ID
#   CF_PROJECT_NAME - The name of the Pages project (as created on Cloudflare)
#   CF_API_TOKEN    - Cloudflare API Token with Pages edit permissions

set -e

# Ensure required env vars are set
if [[ -z "$CF_ACCOUNT_ID" || -z "$CF_PROJECT_NAME" || -z "$CF_API_TOKEN" ]]; then
  echo "Error: CF_ACCOUNT_ID, CF_PROJECT_NAME, and CF_API_TOKEN must be set as environment variables."
  exit 1
fi

# Install dependencies (if not already installed)
if [[ ! -d "node_modules" ]]; then
  echo "Installing npm dependencies..."
  npm ci
fi

# Build the Vite app (output folder: dist)
echo "Building the project..."
npm run build

# Install Wrangler CLI if not present
if ! command -v wrangler &> /dev/null; then
  echo "Installing Wrangler CLI..."
  npm i -g @cloudflare/wrangler
fi

# Publish to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
wrangler pages publish ./dist \
  --project-name "$CF_PROJECT_NAME" \
  --account-id "$CF_ACCOUNT_ID" \
  --api-token "$CF_API_TOKEN"

echo "Deployment completed successfully."
