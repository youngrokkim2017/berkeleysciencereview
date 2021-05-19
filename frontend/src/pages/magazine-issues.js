import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const MagazineIssuePage = ({ data }) => {
  const magazinesSortedByIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue).slice(1, data.allStrapiMagazineIssue.edges.length);

  return (
    <Layout>
      <Seo title="Magazine issues" />
      <h2 className="font-normal mb-4 pb-2 text-4xl border-b border-black">Magazine Issues</h2>
        <div>
          {magazinesSortedByIssue.reverse().map(document => (
            <h2 className="font-normal text-base mb-2 md:text-xl">
              <Link to={`/magazine/${document.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                {document.node.title}
              </Link>
            </h2>
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