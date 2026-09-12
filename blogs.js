const { shopifyFetch } = require("./_shopify");

const QUERY = `
  query GetBlogArticles($first: Int!) {
    blogs(first: 5) {
      edges {
        node {
          title
          handle
          articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
            edges {
              node {
                title
                handle
                excerpt
                contentHtml
                publishedAt
                image {
                  url
                  altText
                }
                author: authorV2 {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  try {
    const first = parseInt(req.query.limit, 10) || 10;
    const data = await shopifyFetch(QUERY, { first });

    // Flatten into a simple array of articles across all blogs
    const articles = [];
    data.blogs.edges.forEach((blogEdge) => {
      const blogTitle = blogEdge.node.title;
      const blogHandle = blogEdge.node.handle;
      blogEdge.node.articles.edges.forEach((articleEdge) => {
        articles.push({
          blog: blogTitle,
          blogHandle,
          title: articleEdge.node.title,
          handle: articleEdge.node.handle,
          excerpt: articleEdge.node.excerpt,
          contentHtml: articleEdge.node.contentHtml,
          publishedAt: articleEdge.node.publishedAt,
          image: articleEdge.node.image ? articleEdge.node.image.url : null,
          author: articleEdge.node.author ? articleEdge.node.author.name : null,
        });
      });
    });

    res.status(200).json({ success: true, count: articles.length, articles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
