# Trendique Environment Variables Configuration

Copy this file to `.env.local` and fill in the values.

## Database URL
For Neon DB (cloud): `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/databasename?sslmode=require`
For local PostgreSQL: `postgresql://username:password@localhost:5432/trendique`

```
DATABASE_URL="postgresql://user:password@localhost:5432/trendique"
```

## Better Auth Configuration

Generate a secret key with: `openssl rand -base64 32`

```
BETTER_AUTH_SECRET="your-super-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"
```

## Google OAuth Credentials

Get these from: https://console.cloud.google.com/apis/credentials

1. Create a new OAuth 2.0 Client ID
2. Set Authorized redirect URIs to: `http://localhost:3000/api/auth/callback/google`

```
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```
