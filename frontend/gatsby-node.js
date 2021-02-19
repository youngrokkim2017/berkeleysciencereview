/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

//

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
        about: allStrapiAboutUs {
          edges {
            node {
              id
              title
            }
          }
        }
        join: allStrapiJoinUs {
          edges {
            node {
              id
              title
            }
          }
        }
        staff: allStrapiStaffListing {
          edges {
            node {
              id
              title
            }
          }
        }
        write: allStrapiWriteForUs {
          edges {
            node {
              id
              title
            }
          }
        }
        resources: allStrapiWritingResources {
          edges {
            node {
              id
              title
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
  // const subscribe = result.data.subscribe.edges;
  const about = result.data.about.edges;
  const join = result.data.join.edges;
  const staff = result.data.staff.edges;
  const write = result.data.write.edges;
  const resources = result.data.resources.edges;

  // ARTICLE CONTENT TYPE
  // const ArticleTemplate = require.resolve("./src/templates/article.js");
  articles.forEach(({ node }) => {
    createPage({
      path: `/article/${node.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/article.js`),
      context: {
        id: node.id,
      },
    });
  });

  // CATEGORY CONTENT TYPE
  // const CategoryTemplate = require.resolve("./src/templates/category.js");
  categories.forEach(({ node }) => {
    createPage({
      path: `/category/${node.title.split(" ").map((cat) => cat.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/category.js`),
      context: {
        id: node.id,
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
      path: `/about-us/`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        id: node.id,
      },
    })
  })

  // JOIN US
  join.forEach(({ node }) => {
    createPage({
      path: `/join-us/`,
      component: path.resolve(`src/templates/join.js`),
      context: {
        id: node.id,
      },
    })
  })

  // STAFF LISTING
  staff.forEach(({ node }) => {
    createPage({
      path: `/staff-listing/`,
      component: path.resolve(`src/templates/staff.js`),
      context: {
        id: node.id,
      },
    })
  })

  // ABOUT
  write.forEach(({ node }) => {
    createPage({
      path: `/write-for-us/`,
      component: path.resolve(`src/templates/write.js`),
      context: {
        id: node.id,
      },
    })
  })

  // ABOUT
  resources.forEach(({ node }) => {
    createPage({
      path: `/writing-resources/`,
      component: path.resolve(`src/templates/resources.js`),
      context: {
        id: node.id,
      },
    })
  })

  // // SUBSCRIBE
  // subscribe.forEach(({ node }) => {
  //   createPage({
  //     path: `/subscribe/`,
  //     component: path.resolve(`src/templates/subscribe.js`),
  //     context: {
  //       id: node.id,
  //     },
  //   })
  // })
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