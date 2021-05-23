import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const MagazineIssuePage = ({ data }) => {
  const magazinesSortedByIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue).slice(1, data.allStrapiMagazineIssue.edges.length);
  return (
    <Layout>
      <Seo title="Magazine issues" />
      <h2 className="font-normal mb-8 pb-2 text-4xl border-b border-black">Magazine Issues</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-12 gap-y-6 -mb-6 sm:mb-0 h-full">
        {magazinesSortedByIssue.reverse().map(document => (
          <Link to={`/magazine/${document.node.title.split(" ").filter(i => i).map((a) => a.toLowerCase()).join("-")}`}>
            {document.node.thumbnail ?
              <div>
                <h2 className="mb-1 text-2xl">
                  {document.node.title}
                </h2>
                <img src={document.node.thumbnail.publicURL} alt="" />
              </div>
              :
              <div>
                <h2 className="mb-1 text-2xl">
                  {document.node.title}
                </h2>
              </div>
            }
          </Link>
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
          thumbnail {
            publicURL
          }
          pdf {
            publicURL
          }
        }
      }
    }
  }
`