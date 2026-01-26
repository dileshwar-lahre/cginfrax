# ⚡ QUICK FIX: redirect_uri_mismatch Error

## 🎯 Problem
Google OAuth error: `Error 400: redirect_uri_mismatch`

## ✅ Solution (2 Minutes)

### Step 1: Google Console Mein Redirect URI Add Karo

1. **Google Cloud Console** open karo: https://console.cloud.google.com/apis/credentials

2. Apne **OAuth 2.0 Client ID** ko click karo:
   - Client ID: `269308007726-hlcpds1fus92tet29v9gmprnf74b18v3`

3. **"Authorized redirect URIs"** section mein ye URL add karo:
   ```
   https://cginfrax.com/api/auth/callback/google
   ```

4. **Save** button click karo

5. **2-3 minutes wait** karo

### Step 2: Verify

- `.env` file check karo: `NEXTAUTH_URL=https://cginfrax.com` ✅
- Google Console mein redirect URI add kiya ✅
- Save kiya ✅
- Wait kiya ✅

### Step 3: Test

- Website pe jao
- Google login try karo
- Ab kaam karna chahiye! 🎉

---

## 📋 Exact URL to Add in Google Console:

```
https://cginfrax.com/api/auth/callback/google
```

**Important:**
- ✅ HTTPS (not HTTP)
- ✅ No trailing slash
- ✅ Exact match

---

## 🔍 Current Configuration:

- **Domain**: `cginfrax.com`
- **NEXTAUTH_URL**: `https://cginfrax.com` ✅
- **Callback URL**: `https://cginfrax.com/api/auth/callback/google`
- **Google Console**: Ye URL add karna hoga ⚠️

---

## ⚠️ Most Common Issue:

**Google Console mein redirect URI add nahi hua hai!**

Ye manually add karna **MUST** hai. Code se automatically nahi hota.

---

## ✅ After Adding Redirect URI:

1. Save karo
2. 2-3 minutes wait karo
3. Server restart karo (agar needed)
4. Browser cache clear karo
5. Phir se try karo

---

**Ye fix 100% kaam karega agar Google Console mein redirect URI properly add hoga!** ✅
