# Azure Pipelines: Frontend Container Build and Deploy

This pipeline automates the process of building and publishing Docker images to Azure Container Registry (ACR) and deploying them to Development and Production Azure Container Apps.

## Pipeline Overview

- **Trigger:** Runs on every push to the `main` branch.
- **Builds** a Docker image and pushes it to ACR with both a unique build tag and `latest` tag.
- **Deploys** the image sequentially to Development and then Production Azure Container Apps.

## Pipeline Stages

### 1. Build
- Uses the `Docker@2` task to build and push the Docker image to the specified ACR.
- Tags the image with the build ID and `latest`.
- Applies a custom build tag for traceability.

### 2. DeployToDev
- Uses the `AzureCLI@2` task to update the Development Azure Container App with the new image.
- Requires the correct Azure subscription, resource group, and container app name for the Dev environment.

### 3. DeployToProd
- Waits for Dev deployment to finish.
- Uses the `AzureCLI@2` task to update the Production Azure Container App with the new image.
- Requires the correct Azure subscription, resource group, and container app name for the Prod environment.

## Required Configuration

### Pipeline Variables
Set these variables in the Azure Pipeline UI or in a variable group (do not hardcode secrets):

- `imageRepository`: Name of the image repository in ACR (e.g., `frontend-app`)
- `containerRegistry`: Azure service connection name for ACR
- `containerRegistryName`: Name of the ACR instance (e.g., `myregistry`)
- `azureSubscriptionDev`: Azure service connection for Dev
- `resourceGroupDev`: Resource group for Dev
- `containerAppNameDev`: Container App name for Dev
- `azureSubscriptionPrd`: Azure service connection for Prod
- `resourceGroupPrd`: Resource group for Prod
- `containerAppNamePrd`: Container App name for Prod
- `VERSION_MAJOR`, `VERSION_MINOR`, `VERSION_PATCH` (optional, for custom versioning)

### Service Connections
- **ACR Service Connection:** Used by the `Docker@2` task to push images.
- **Azure Service Connections:** Used by the `AzureCLI@2` tasks for Dev and Prod deployments.

## Notes
- The pipeline uses `ubuntu-latest` agents.
- The Dockerfile is expected at the root of the repository.
- The pipeline is sequential: Build → Deploy to Dev → Deploy to Prod.
- Make sure all required variables and service connections are set up in Azure DevOps before running the pipeline.

---

For more details, see the pipeline definition in `azure-pipelines.yml`.
