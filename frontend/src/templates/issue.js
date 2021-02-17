import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import Preview from "../components/preview"

const MagazineIssueTemplate = ({ data }) => (
  <Layout>
    <div className="">
      <h2 className="font-normal mb-12 text-4xl leading-tight">{data.strapiMagazineIssue.title}</h2>
    </div>
  </Layout>
)

export default MagazineIssueTemplate;

export const query = graphql`
  query MagazineIssueTemplate($id: String!) {
    strapiMagazineIssue(id: { eq: $id }) {
      id
      title
    }
  }
`