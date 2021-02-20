import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const WritingResourcesTemplate = ({ data }) => (
  <Layout>
    <div>{data.strapiWritingResources.title}</div>
    <div className="prose tracking-normal text-black text-center text-lg max-w-full">
      <ReactMarkdown source={data.strapiWritingResources.content} />
    </div>
  </Layout>
)

export default WritingResourcesTemplate;

export const query = graphql`
  query WritingResourcesTemplate($id: String!) {
    strapiWritingResources(id: { eq: $id }) {
      title
      content
    }
  }
`