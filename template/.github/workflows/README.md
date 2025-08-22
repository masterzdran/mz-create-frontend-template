# GitHub Actions Pipeline: Frontend Container Build and Deploy

This workflow automates the build, push, and deployment of the frontend container to Azure Web Apps across development, UAT, and production environments.

## Pipeline Overview

- **Trigger:** Runs on every push to the `main` branch.
- **Builds** a Docker image and pushes it to Azure Container Registry (ACR).
- **Deploys** the image sequentially to three Azure Web Apps:
  - Development
  - UAT
  - Production
- **Uses environments** for separation and potential manual approvals.

## Pipeline Stages

1. **build-and-push**
   - Checks out the code.
   - Logs in to ACR using secrets.
   - Builds the Docker image with a versioned and `latest` tag.
   - Pushes both tags to ACR.
   - Exposes the image tag as an output for later jobs.

2. **deploy-dev**
   - Logs in to Azure using secrets.
   - Deploys the built image to the development Web App.
   - Logs out of Azure.

3. **deploy-uat**
   - Waits for dev deployment to finish.
   - Logs in to Azure.
   - Deploys the same image to the UAT Web App.
   - Logs out of Azure.

4. **deploy-prod**
   - Waits for UAT deployment to finish.
   - Logs in to Azure.
   - Deploys the same image to the production Web App.
   - Logs out of Azure.

## Required Environment Configuration

### GitHub Secrets
- `ACR_REGISTRY_SERVER`: Azure Container Registry login server (e.g., `myregistry.azurecr.io`)
- `ACR_REGISTRY_USERNAME`: Username for ACR
- `ACR_REGISTRY_PASSWORD`: Password for ACR
- `AZURE_CLIENT_ID`: Azure service principal client ID
- `AZURE_TENANT_ID`: Azure tenant ID
- `AZURE_SUBSCRIPTION_ID`: Azure subscription ID

### GitHub Variables
- `FRONTEND_DOCKER_IMAGE_NAME`: Name of the Docker image (e.g., `frontend-app`)
- `VERSION_MAJOR`: Major version number (e.g., `1`)
- `VERSION_MINOR`: Minor version number (e.g., `0`)
- `VERSION_PATCH`: Patch version number (e.g., `0`)

### Azure Web App Names (in workflow env)
- `DEV_APP_NAME`: Name of the development Web App
- `UAT_APP_NAME`: Name of the UAT Web App
- `PRD_APP_NAME`: Name of the production Web App

> **Note:** Ensure all secrets and variables are set in your repository or organization settings before running the pipeline.

## Customization
- To add linting or testing, insert steps before the build in the `build-and-push` job.
- To require manual approval for production, configure the `production` environment in GitHub with required reviewers.

---

For more details, see the workflow file: `github-actions.yaml`.
