import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const MagazineIssuePage = ({ data }) => {
  const magazinesSortedByIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue).slice(1, data.allStrapiMagazineIssue.edges.length);

  // let pathURL = document.node.title.split(" ").map((a) => a.toLowerCase()).join("-");

  // if (pathURL[pathURL.length - 1] === "-") {
  //   pathURL = pathURL.slice(0, -1);
  // }

  return (
    <Layout>
      <Seo title="Magazine issues" />
        <h2 className="font-normal mb-4 text-4xl">Magazine Issues</h2>
        <div className="space-y-1">
          {magazinesSortedByIssue.map(document => (
            <div>
              {document.node.title.split(" ").map((a) => a.toLowerCase()).join("-")[document.node.title.split(" ").map((a) => a.toLowerCase()).join("-").length - 1] === "-" ?
                <div>
                  <Link to={`/magazine/${document.node.title.split(" ").map((a) => a.toLowerCase()).join("-").slice(0, -1)}`}>
                    {document.node.title}
                  </Link>
                </div>
              :
                <div>
                  <Link to={`/magazine/${document.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                    {document.node.title}
                  </Link>
                </div>
              }
            </div>

            // <div>
            //   <Link to={`/magazine/${document.node.title.split(" ").map((a) => a.toLowerCase()).join("-").slice(0, -1)}`}>
            //     {document.node.title}
            //   </Link>
            // </div>
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