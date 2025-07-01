# 🚀 Quick CI/CD Setup for Existing Azure Resources

If you already have an Azure Container Registry and App Service, this is the simplified setup!

## 📋 What You Need

- ✅ Existing Azure Container Registry
- ✅ Existing Azure App Service (configured for containers)
- ✅ GitHub repository with your code

## 🔧 Quick Setup Steps

### 1. Get Your Resource Names

Find your existing resource names:

```bash
# List your container registries
az acr list --output table

# List your web apps
az webapp list --output table
```

### 2. Get Container Registry Credentials

```bash
# Replace 'your-registry-name' with your actual registry name
az acr credential show --name your-registry-name
```

This will give you the `username` and `password` for your registry.

### 3. Create Service Principal (if you don't have one)

```bash
# Create a service principal for your resource group
az ad sp create-for-rbac \
  --name genzdealz-github-actions \
  --role contributor \
  --scopes /subscriptions/$(az account show --query id --output tsv)/resourceGroups/your-resource-group-name \
  --sdk-auth
```

### 4. Update the Workflow File

Edit `.github/workflows/deploy-simple.yml` and update these lines:

```yaml
env:
  AZURE_WEBAPP_NAME: your-actual-webapp-name
  AZURE_REGISTRY: your-actual-registry-name
  IMAGE_NAME: genzdealz-nextjs
```

### 5. Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

| Secret Name         | Value                       |
| ------------------- | --------------------------- |
| `AZURE_CREDENTIALS` | The entire JSON from step 3 |
| `REGISTRY_USERNAME` | Username from step 2        |
| `REGISTRY_PASSWORD` | Password from step 2        |

### 6. Deploy!

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

## 🎯 That's It!

Your app will now automatically deploy whenever you push to the main branch.

## 🔍 Troubleshooting

### If your App Service isn't configured for containers:

```bash
# Configure your web app for Docker
az webapp config container set \
  --resource-group your-resource-group \
  --name your-webapp-name \
  --docker-custom-image-name your-registry.azurecr.io/genzdealz-nextjs:latest \
  --docker-registry-server-url https://your-registry.azurecr.io \
  --docker-registry-server-user your-username \
  --docker-registry-server-password your-password
```

### If you need to check your web app configuration:

```bash
# Check current container settings
az webapp config container show \
  --resource-group your-resource-group \
  --name your-webapp-name
```

## 📞 Need Help?

If you run into issues, check:

1. Resource names are correct in the workflow file
2. GitHub secrets are properly set
3. Service principal has the right permissions
4. App Service is configured for containers

That's the simplified version! Much easier when you already have the infrastructure. 🎉
