import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const MagazineIssuePage = ({ data }) => {
  const magazinesSortedByIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue).slice(1, data.allStrapiMagazineIssue.edges.length);

  return (
    <Layout>
      <SEO title="Magazine issues" />
      <main className="container mx-auto px-4 sm:px-6 xl:px-6">
        <h2 className="font-normal mb-4 text-4xl leading-tight">Magazine Issues</h2>
        <div className="space-y-1">
          {magazinesSortedByIssue.map(document => (
            <div>
              <Link to={`/magazine/${document.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                {document.node.title}
              </Link>
            </div>
          ))}
        </div>
      </main>
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