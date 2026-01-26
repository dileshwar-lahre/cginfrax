# 🔴 URGENT: Google Console Setup Required

## Error: redirect_uri_mismatch

**Ye error tab aata hai jab Google Console mein redirect URI add nahi hota.**

---

## ✅ Step-by-Step Fix (5 Minutes)

### Step 1: Google Cloud Console Mein Jao
1. Ye link open karo: https://console.cloud.google.com/apis/credentials
2. Apna project select karo
3. **OAuth 2.0 Client IDs** section mein apna client ID click karo
   - Client ID: `269308007726-hlcpds1fus92tet29v9gmprnf74b18v3.apps.googleusercontent.com`

### Step 2: Authorized Redirect URIs Add Karo

**"Authorized redirect URIs"** section mein ye **EXACT** URL add karo:

```
https://cginfrax.com/api/auth/callback/google
```

**Important:**
- ✅ HTTPS use karo (HTTP nahi)
- ✅ Trailing slash mat lagao (end mein `/` nahi)
- ✅ Exact match hona chahiye

### Step 3: Save Karo
- **Save** button click karo
- 2-3 minutes wait karo (Google ko time chahiye update karne ke liye)

### Step 4: Test Karo
- Apni website pe jao
- Google login try karo
- Ab kaam karna chahiye! ✅

---

## 📋 Complete Redirect URI List

Agar aap multiple domains use kar rahe ho, to ye sab add karo:

```
https://cginfrax.com/api/auth/callback/google
https://www.cginfrax.com/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

---

## 🔍 Verification Checklist

- [ ] Google Console mein redirect URI add kiya
- [ ] Exact URL match kar raha hai: `https://cginfrax.com/api/auth/callback/google`
- [ ] HTTPS use kiya (HTTP nahi)
- [ ] Trailing slash nahi hai
- [ ] Save button click kiya
- [ ] 2-3 minutes wait kiya
- [ ] Server restart kiya (agar needed)

---

## 🚨 Common Mistakes

1. ❌ **HTTP use karna**: `http://cginfrax.com/api/auth/callback/google`
   ✅ **HTTPS use karo**: `https://cginfrax.com/api/auth/callback/google`

2. ❌ **Trailing slash**: `https://cginfrax.com/api/auth/callback/google/`
   ✅ **No trailing slash**: `https://cginfrax.com/api/auth/callback/google`

3. ❌ **Wrong path**: `https://cginfrax.com/auth/callback/google`
   ✅ **Correct path**: `https://cginfrax.com/api/auth/callback/google`

4. ❌ **www mismatch**: Agar `www.cginfrax.com` use kar rahe ho, to dono add karo

---

## 📸 Visual Guide

### Google Console Screenshot Location:
1. Google Cloud Console > APIs & Services > Credentials
2. OAuth 2.0 Client ID click karo
3. **"Authorized redirect URIs"** section mein add karo

### Example:
```
Authorized redirect URIs
┌─────────────────────────────────────────────────────┐
│ https://cginfrax.com/api/auth/callback/google       │
│                                                      │
│ [+ ADD URI]                                         │
└─────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Test

Agar setup sahi hai, to ye URL browser mein open karo:
```
https://cginfrax.com/api/auth/signin
```

Agar Google login button dikhe, to setup sahi hai! ✅

---

## 🆘 Still Not Working?

1. **Check `.env` file**: `NEXTAUTH_URL=https://cginfrax.com` hona chahiye
2. **Clear browser cache**: Ctrl+Shift+Delete
3. **Wait 5 minutes**: Google ko propagation time chahiye
4. **Check Google Console**: Redirect URI exactly match karna chahiye
5. **Server restart**: Agar local development mein ho

---

## 📞 Support

Agar abhi bhi problem hai, to check karo:
- Google Console mein redirect URI properly add hua hai ya nahi
- `.env` file mein `NEXTAUTH_URL` sahi hai ya nahi
- Server logs mein koi error hai ya nahi
