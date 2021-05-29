import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import Seo from "../components/seo"

const WritingResourcesTemplate = ({ data }) => (
  <Layout>
    <Seo
      title={data.strapiWritingResources.title}
    />
    <h2 className="font-normal mb-8 pb-2 text-4xl border-b border-black">{data.strapiWritingResources.title}</h2>
    <div className="flex-grow flex-shrink-0 prose tracking-normal text-black max-w-full">
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