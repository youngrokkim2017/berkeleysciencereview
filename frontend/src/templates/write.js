import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const WriteForUsTemplate = ({ data }) => (
  <Layout>
     <h2 className="font-normal mb-8 text-4xl leading-tight">{data.strapiWriteForUs.title}</h2>
      <div className="flex-grow flex-shrink-0 prose tracking-normal text-black max-w-full">
      <ReactMarkdown source={data.strapiWriteForUs.content} />
    </div>
  </Layout>
)

export default WriteForUsTemplate;

export const query = graphql`
  query WriteForUsTemplate($id: String!) {
    strapiWriteForUs(id: { eq: $id }) {
      title
      content
    }
  }
`