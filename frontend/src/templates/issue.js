import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Preview from "../components/preview"

const MagazineIssueTemplate = ({ data }) => (
  <Layout>
    <div className="mx-auto">
      <h2 className="font-normal mb-12 pb-8 text-4xl leading-tight border-b border-black">{data.strapiMagazineIssue.title}</h2>
      <ul>
{/*       {data.strapiMagazineIssue.articles.map(document => (
        <li key={document.id}>
          <Preview article={document} format="small" />
        </li>
      ))} */}
    </ul>
    </div>
  </Layout>
)

export default MagazineIssueTemplate;

export const query = graphql`
  query MagazineIssueTemplate($id: String!) {
    strapiMagazineIssue(id: { eq: $id }) {
      id
      title
      issue
      articles {
        id
        title
        author
        content
        image {
          publicURL
        }
        published_at
      }
    }
  }
`