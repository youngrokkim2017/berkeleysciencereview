import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const StaffTemplate = ({ data }) => (
  <Layout>
      <h2 className="font-normal mb-8 pb-2 text-4xl border-b border-black">{data.strapiStaffListing.title}</h2>
      <div className="flex-grow flex-shrink-0 prose tracking-normal text-black max-w-full">
        <ReactMarkdown source={data.strapiStaffListing.content}/>
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