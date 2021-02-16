/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        articles: allStrapiArticle {
          edges {
            node {
              id
              title
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              id
              title
              articles {
                id
                title
              }
            }
          }
        }
        authors: allStrapiAuthors {
          edges {
            node {
              id
              name
            }
          }
        }
        issues: allStrapiMagazineIssue {
          edges {
            node {
              id
              title
            }
          }
        }
        about: allStrapiAbout {
          edges {
            node {
              id
            }
          }
        }
        staff: allStrapiStaffListing {
          edges {
            node {
              id
            }
          }
        }
        subscribe: allStrapiSubscribe {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog articles pages.
  const articles = result.data.articles.edges;
  const categories = result.data.categories.edges;
  const authors = result.data.authors.edges;
  const issues = result.data.issues.edges;
  const about = result.data.about.edges;
  const staff = result.data.staff.edges;
  const subscribe = result.data.subscribe.edges;

  // ARTICLE CONTENT TYPE
  // const ArticleTemplate = require.resolve("./src/templates/article.js");
  articles.forEach((article, index) => {
    const previous = index === articles.length - 1 ? null : articles[index + 1].node;
    const next = index === 0 ? null : articles[index - 1].node;

    createPage({
      // path: `/article/${article.node.title.split(/[\s\.\,\\\/\#\!\$\%\^\&\*\;\:\{\}\=\-\_\`\~\(\)]+/).map((a) => a.toLowerCase()).join("-")}`,
      path: `/article/${article.node.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/article.js`),
      context: {
        id: article.node.id,
        previous,
        next,
      },
    });
  });

  // ARCHIVE PAGINATION
  // const articles = result.data.allStrapiArticle.edges;
  const postsPerPage = 10;
  const numPages = Math.ceil(articles.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/archive/1` : `/archive/${i + 1}`,
      component: path.resolve('src/pages/archive.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      }
    })
  })

  // CATEGORY CONTENT TYPE
  // const CategoryTemplate = require.resolve("./src/templates/category.js");
  categories.forEach((category, index) => {
    createPage({
      path: `/category/${category.node.title.split(" ").map((cat) => cat.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/category.js`),
      context: {
        id: category.node.id,
      },
    });
  });

  // AUTHOR CONTENT TYPE
  authors.forEach(({ node }) => {
    createPage({
      path: `/author/${node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/author.js`),
      context: {
        id: node.id,
      },
    })
  })

  // MAGAZINE ISSUE CONTENT TYPE
  issues.forEach(({ node }) => {
    createPage({
      path: `/magazine/${node.title.split(" ").map((a) => a.toLowerCase()).join("-")}}`,
      component: path.resolve(`src/templates/issue.js`),
      context: {
        id: node.id,
      },
    })
  })

  // SINGLE TYPES
  // ABOUT
  about.forEach(({ node }) => {
    createPage({
      path: `/about/`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        id: node.id,
      },
    })
  })

  // STAFF
  staff.forEach(({ node }) => {
    createPage({
      path: `/staff/`,
      component: path.resolve(`src/templates/staff.js`),
      context: {
        id: node.id,
      },
    })
  })

  // SUBSCRIBE
  subscribe.forEach(({ node }) => {
    createPage({
      path: `/subscribe/`,
      component: path.resolve(`src/templates/subscribe.js`),
      context: {
        id: node.id,
      },
    })
  })
};

module.exports.onCreateNode = async ({ node, actions, createNodeId }) => {
  const crypto = require(`crypto`);

  if (node.internal.type === "StrapiArticle") {
    const newNode = {
      id: createNodeId(`StrapiArticleContent-${node.id}`),
      parent: node.id,
      children: [],
      internal: {
        content: node.content || " ",
        type: "StrapiArticleContent",
        mediaType: "text/markdown",
        contentDigest: crypto
          .createHash("md5")
          .update(node.content || " ")
          .digest("hex"),
      },
    };
    actions.createNode(newNode);
    actions.createParentChildLink({
      parent: node,
      child: newNode,
    });
  }
};