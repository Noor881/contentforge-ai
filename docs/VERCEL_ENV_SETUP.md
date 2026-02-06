# Vercel Environment Variables Setup

Follow these steps to configure your production environment variables in Vercel:

## 1. Go to Vercel Dashboard
Visit: https://vercel.com/noors-projects-7184e79a/contentforge-ai/settings/environment-variables

## 2. Add These Environment Variables

Click "Add New" for each variable:

### Database
```
DATABASE_URL
[Your Neon PostgreSQL connection string]
```

### NextAuth
```
NEXTAUTH_URL
https://contentforge-ai-xi.vercel.app
```

```
NEXTAUTH_SECRET
[Generate with: openssl rand -base64 32]
```

### Google OAuth
```
GOOGLE_CLIENT_ID
[Your Google OAuth Client ID from console.cloud.google.com]
```

```
GOOGLE_CLIENT_SECRET
[Your Google OAuth Client Secret]
```

### Groq AI
```
GROQ_API_KEY
[Your Groq API key from console.groq.com]
```

### App Configuration
```
NEXT_PUBLIC_APP_URL
https://contentforge-ai-xi.vercel.app
```

```
NEXT_PUBLIC_APP_NAME
ContentForge AI
```

## 3. Set Environment Scope
For each variable, select: **Production, Preview, and Development**

## 4. Redeploy
After adding all variables:
1. Go to Deployments
2. Click on the latest deployment
3. Click the three dots (•••)
4. Select "Redeploy"
5. Check "Use existing Build Cache"
6. Click "Redeploy"

## 5. Update Google OAuth Redirect URI

⚠️ **IMPORTANT:** You need to add the Vercel production URL to your Google OAuth settings!

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID
3. Under **Authorized redirect URIs**, add:
   ```
   https://contentforge-ai-xi.vercel.app/api/auth/callback/google
   ```
4. Click **Save**

## Verification
After redeployment:
1. Visit https://contentforge-ai-xi.vercel.app
2. Click "Sign in with Google"
3. Should redirect to Google login and work correctly!
