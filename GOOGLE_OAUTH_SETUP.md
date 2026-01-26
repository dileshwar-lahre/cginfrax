# Google OAuth Redirect URI Setup Guide

## Error: redirect_uri_mismatch Fix

Agar aapko "redirect_uri_mismatch" error aa raha hai, to ye steps follow karein:

### Step 1: Google Cloud Console Setup

1. Google Cloud Console mein jao: https://console.cloud.google.com/
2. Apna project select karo
3. **APIs & Services** > **Credentials** pe jao
4. Apne OAuth 2.0 Client ID ko click karo

### Step 2: Authorized Redirect URIs Add Karo

**Authorized redirect URIs** section mein ye URLs add karo:

#### Production (cginfrax.com):
```
https://cginfrax.com/api/auth/callback/google
https://www.cginfrax.com/api/auth/callback/google
```

#### Development (Local):
```
http://localhost:3000/api/auth/callback/google
```

### Step 3: Environment Variables Check Karo

`.env` file mein ye ensure karo:

```env
NEXTAUTH_URL=https://cginfrax.com
# Ya agar www use kar rahe ho:
# NEXTAUTH_URL=https://www.cginfrax.com

GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### Important Notes:

1. **HTTPS Required**: Production mein sirf HTTPS URLs use karo
2. **No Trailing Slash**: URLs ke end mein `/` mat lagao
3. **Exact Match**: Google Console aur NEXTAUTH_URL dono exact match hone chahiye
4. **Both www and non-www**: Agar dono use kar rahe ho, to dono add karo

### Current Setup:

- Domain: `cginfrax.com`
- NEXTAUTH_URL: `https://cginfrax.com` (ya `https://www.cginfrax.com` agar www use kar rahe ho)
- Callback URL: `https://cginfrax.com/api/auth/callback/google`

### Verification:

1. Google Console mein redirect URI add karne ke baad **Save** karo
2. 2-3 minutes wait karo (propagation time)
3. Phir se login try karo

### Common Issues:

- **Error 400: redirect_uri_mismatch**: Redirect URI Google Console mein add nahi hai
- **Error 403: access_denied**: OAuth consent screen properly setup nahi hai
- **Error 500**: Server-side issue (check logs)

### Quick Fix:

Agar abhi bhi error aa raha hai, to:

1. `.env` file mein `NEXTAUTH_URL` ko exact domain se match karo
2. Google Console mein exact same URL add karo
3. Server restart karo
4. Browser cache clear karo
