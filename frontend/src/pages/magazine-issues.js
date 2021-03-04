import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const MagazineIssuePage = ({ data }) => {
  const magazinesSortedByIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue).slice(1, data.allStrapiMagazineIssue.edges.length);

  return (
    <Layout>
      <SEO title="Magazine issues" />
      <div>
        {magazinesSortedByIssue.map(document => (
          <div>
            <Link to={`/magazine/${document.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
              {document.node.title}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default MagazineIssuePage;

export const magazineIssuePageQuery = graphql`
  query MagazineIssuePageQuery {
    allStrapiMagazineIssue {
      edges {
        node {
          id
          title
          pdf {
            publicURL
          }
        }
      }
    }
  }
`