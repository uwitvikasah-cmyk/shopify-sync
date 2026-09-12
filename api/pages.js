const { shopifyFetch } = require("./_shopify");

const QUERY = `
  query GetPages($first: Int!) {
    pages(first: $first) {
      edges {
        node {
          title
          handle
          body
          bodySummary
          updatedAt
        }
      }
    }
  }
`;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  try {
    const first = parseInt(req.query.limit, 10) || 20;
    const data = await shopifyFetch(QUERY, { first });

    const pages = data.pages.edges.map((edge) => ({
      title: edge.node.title,
      handle: edge.node.handle,
      body: edge.node.body,
      summary: edge.node.bodySummary,
      updatedAt: edge.node.updatedAt,
    }));

    res.status(200).json({ success: true, count: pages.length, pages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
