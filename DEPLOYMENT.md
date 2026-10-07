# Deployment Guide

## Overview

This guide provides instructions for deploying the Generated Project application to various hosting platforms. The project is built with TypeScript, React, and Vite, and supports multiple deployment options.

## Prerequisites

Before deploying, ensure you have:

- Node.js (v18 or later)
- npm or yarn
- A build of the application (`npm run build` or `yarn build`)
- Environment variables configured for production

## Environment Configuration

Create a `.env.production` file in the project root with your production environment variables:

```env
VITE_API_BASE_URL=https://your-production-api-url.com/api
VITE_ENABLE_MOCK_DATA=false
VITE_SENTRY_DSN=your-sentry-dsn-if-applicable
VITE_GOOGLE_ANALYTICS_ID=your-google-analytics-id-if-applicable
VITE_APP_TITLE=Your Production App Title
```

## Build the Application

Run the following command to create a production build:

```bash
npm run build
# or
yarn build
```

This will generate optimized files in the `dist` directory.

## Deployment Options

### Vercel

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Install the Vercel CLI (if not already installed):

```bash
npm install -g vercel
# or
yarn global add vercel
```

2. Deploy the application:

```bash
vercel
```

Follow the prompts to link your project and deploy.

**Alternative: Git Integration**

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import the project into Vercel
3. Configure the project settings:
   - Build Command: `npm run build` or `yarn build`
   - Output Directory: `dist`
   - Environment Variables: Add your production environment variables
4. Deploy

### Netlify

1. Install the Netlify CLI (if not already installed):

```bash
npm install -g netlify-cli
# or
yarn global add netlify-cli
```

2. Deploy the application:

```bash
ntl deploy
```

For production deployment:

```bash
ntl deploy --prod
```

**Alternative: Git Integration**

1. Push your code to a Git repository
2. Import the project into Netlify
3. Configure the project settings:
   - Build Command: `npm run build` or `yarn build`
   - Publish Directory: `dist`
   - Environment Variables: Add your production environment variables
4. Deploy

### AWS Amplify

1. Push your code to a Git repository
2. Sign in to the AWS Amplify Console
3. Connect your repository
4. Configure the build settings:
   - Build Command: `npm run build` or `yarn build`
   - Output Directory: `dist`
5. Add environment variables
6. Deploy

### AWS S3 + CloudFront

1. Create an S3 bucket and configure it for static website hosting
2. Upload the contents of the `dist` directory to the bucket
3. Create a CloudFront distribution with the S3 bucket as the origin
4. Configure the distribution settings:
   - Default Root Object: `index.html`
   - Error Pages: Create custom error responses for 404 and 403 errors to return `index.html`
5. Deploy the distribution

### Firebase Hosting

1. Install Firebase CLI (if not already installed):

```bash
npm install -g firebase-tools
# or
yarn global add firebase-tools
```

2. Initialize Firebase Hosting:

```bash
firebase init
```

Select Hosting and follow the prompts.

3. Build the application:

```bash
npm run build
# or
yarn build
```

4. Deploy to Firebase:

```bash
firebase deploy
```

### Docker Deployment

Create a `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create an `nginx.conf` file:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

Build and run the Docker container:

```bash
docker build -t generated-project .
docker run -p 80:80 generated-project
```

For production, consider using Docker Compose with environment variables.

### Kubernetes Deployment

Create a `deployment.yaml` file:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: generated-project
spec:
  replicas: 2
  selector:
    matchLabels:
      app: generated-project
  template:
    metadata:
      labels:
        app: generated-project
    spec:
      containers:
      - name: generated-project
        image: your-registry/generated-project:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: generated-project
spec:
  selector:
    app: generated-project
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: generated-project-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: generated-project
            port:
              number: 80
```

Apply the deployment:

```bash
kubectl apply -f deployment.yaml
```

## Environment-Specific Considerations

### API Base URL

Ensure the `VITE_API_BASE_URL` environment variable points to your production API endpoint.

### HTTPS

Always use HTTPS in production. Most hosting platforms provide SSL certificates automatically.

### Error Tracking

Configure Sentry or other error tracking services by setting the appropriate environment variables.

### Analytics

Set up Google Analytics or other tracking services by configuring the appropriate environment variables.

## CI/CD Pipeline Example (GitHub Actions)

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Build application
      run: npm run build
      env:
        VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
        VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
        VITE_GOOGLE_ANALYTICS_ID: ${{ secrets.VITE_GOOGLE_ANALYTICS_ID }}
        VITE_APP_TITLE: ${{ secrets.VITE_APP_TITLE }}

    - name: Deploy to Vercel
      run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
      env:
        VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
        VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Post-Deployment Checks

After deployment, verify the following:

1. The application loads correctly in a browser
2. All routes work as expected
3. API requests are successful
4. Authentication flows work
5. Error tracking is capturing errors
6. Analytics are tracking visits

## Troubleshooting

### Common Issues

1. **Blank Page**: Usually caused by incorrect base path or missing environment variables. Verify the build output and hosting configuration.
2. **API Requests Failing**: Check the API base URL and CORS configuration on the API server.
3. **Routing Issues**: Ensure your hosting platform is configured to redirect all requests to `index.html`.
4. **Environment Variables Not Available**: Verify that variables prefixed with `VITE_` are properly set in your hosting platform.

### Debugging

For client-side issues:
- Check browser console for errors
- Verify network requests in browser dev tools
- Ensure environment variables are correctly injected

For server-side issues:
- Check server logs
- Verify API endpoints are accessible
- Ensure proper CORS headers are set

## Rollback Procedure

If a deployment fails:

1. **Vercel/Netlify**: Use the platform's rollback feature to revert to the previous deployment
2. **Docker/Kubernetes**: Redeploy the previous container image
3. **S3/CloudFront**: Re-upload the previous build files and invalidate the CloudFront cache