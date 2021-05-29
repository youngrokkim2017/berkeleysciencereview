import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Preview from "../components/preview"

import "../components/css/styles.css"

const Popular = ({ n }) => {
    const data = useStaticQuery(graphql`
    query PopularPosts {
        allStrapiArticle(sort: {fields: published_at, order: DESC}, limit: 100) {
          edges {
            node {
                id
                title
                authors {
                    id
                    name
                }
                categories {
                    id
                    title
                }
                image {
                    publicURL
                }
                published_at
                fields {
                    slug
                }
            }
          }
        }
        allPageViews(sort: {order: DESC, fields: totalCount}, limit: 20) {
          edges {
            node {
              path
              totalCount
            }
          }
        }
      }
    `)

    function chooseTop(allArticles, popularArticles, n) {
        const results = [];
        for (const a of popularArticles) {
            const popularArticle = allArticles.find(b => b.node.fields.slug === a.node.path);
            if (popularArticle == null) {
                continue;
            } else {
                results.push({
                    ...popularArticle.node,
                });
            }
            if (results.length >= n) {
                break;
            }
        };
        return results;
    }

    const recentResults = chooseTop(data.allStrapiArticle.edges, data.allPageViews.edges, n);

    return (
        <ul>
            {recentResults.map(document => (
                <li key={document.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                    <Preview article={document} format="small" />
                </li>
            ))}
        </ul>
    )
}

export default Popular