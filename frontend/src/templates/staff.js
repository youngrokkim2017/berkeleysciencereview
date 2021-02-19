import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const StaffTemplate = ({ data }) => (
  <Layout>
    <div>{data.strapiStaffListing.title}</div>
    <div className="prose tracking-normal text-black text-center text-lg max-w-full">
      <ReactMarkdown source={data.strapiStaffListing.content} />
    </div>
  </Layout>
)

export default StaffTemplate;

export const query = graphql`
  query StaffTemplate($id: String!) {
    strapiStaffListing(id: { eq: $id }) {
      title
      content
    }
  }
`