# Shopify → InfinityFree Content Sync (via Vercel)

Ye project Shopify ke blogs/pages ko Storefront API se fetch karke JSON banata hai,
jise tum apni InfinityFree wali site pe JavaScript se dikha sakte ho — bina copy-paste kiye.

---

## Step 1: Shopify Storefront API Token lena

1. Shopify Admin → **Settings** → **Apps and sales channels** → **Develop apps**
2. **Create an app** pe click karo, naam do (jaise "InfinityFree Sync")
3. App khulne pe **API credentials** tab → **Configure Storefront API scopes**
4. Ye permissions ON karo:
   - `unauthenticated_read_content` (pages/blogs ke liye)
5. **Install app** karo
6. **Storefront API access token** copy kar lo (ye baar baar nahi dikhega, abhi save kar lo)

---

## Step 2: Is project me apni details daalo

File: `api/_shopify.js` kholo aur ye 2 lines edit karo:

```js
const SHOPIFY_DOMAIN = "your-store.myshopify.com"; // apna store domain
const STOREFRONT_TOKEN = "YOUR_STOREFRONT_API_TOKEN"; // Step 1 wala token
```

---

## Step 3: GitHub pe push karo

```bash
cd shopify-sync
git init
git add .
git commit -m "Initial commit"
git remote add origin <tumhara-github-repo-url>
git push -u origin main
```

(Agar GitHub repo nahi bana hai, pehle github.com pe ek naya empty repo bana lo)

---

## Step 4: Vercel pe deploy karo

1. https://vercel.com pe jaake GitHub se login karo
2. **Add New Project** → apna GitHub repo select karo
3. Deploy pe click karo — Vercel automatically detect kar lega ki ye serverless functions hain
4. Deploy hone ke baad tumhe ek URL milega, jaise:
   `https://shopify-sync-xyz.vercel.app`

---

## Step 5: Test karo

Browser me kholo:
```
https://tumhara-project.vercel.app/api/blogs
https://tumhara-project.vercel.app/api/pages
```

Agar JSON data dikh raha hai (blogs/pages ke saath), matlab sab sahi kaam kar raha hai.

---

## Step 6: InfinityFree wale theme me lagao

`infinityfree-snippet.html` file kholo, usme `VERCEL_URL` apne asli Vercel URL se
replace karo, aur poora code apne InfinityFree PHP/HTML file me jahan blogs
dikhane hain, wahan paste kar do.

---

## Notes

- **Pages** ke liye same tarike se `/api/pages` use karo — HTML similar banega,
  bas `data.pages` array use karna hoga (`title`, `body`, `handle`, `updatedAt`).
- Content **live/auto-update** rahega kyunki har baar page load hone pe naya
  data Shopify se fetch hota hai — koi manual sync nahi karna padega.
- Agar bahut zyada traffic hai, thoda caching (jaise `Cache-Control` header)
  add karna better hoga taki Shopify API pe load kam pade — bata dena agar
  wo bhi chahiye, add kar dunga.
- Design (CSS) apne hisaab se `infinityfree-snippet.html` me customize kar sakte ho.
