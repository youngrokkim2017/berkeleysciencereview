import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const WritingResourcesTemplate = ({ data }) => (
  <Layout>
    <main className="container mx-auto px-4 sm:px-6 xl:px-6">
      <h2 className="font-normal mb-8 text-4xl leading-tight">{data.strapiWritingResources.title}</h2>
      <div className="flex-grow flex-shrink-0 prose tracking-normal text-black max-w-full">
        <ReactMarkdown source={data.strapiWritingResources.content} />
      </div>
      </main>
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