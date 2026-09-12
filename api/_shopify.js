// ==============================================
// YAHAN APNI SHOPIFY DETAILS DAALO (nीचे 2 lines)
// ==============================================
const SHOPIFY_DOMAIN = "f26dy8-yi.myshopify.com"; // <-- apna store domain daalo
const STOREFRONT_TOKEN = "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"; // <-- Step 1 wala token daalo
// ==============================================
 
async function shopifyFetch(query, variables = {}) {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
 
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error (${res.status}): ${text}`);
  }
 
  const json = await res.json();
 
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
 
  return json.data;
}
 
module.exports = { shopifyFetch };
