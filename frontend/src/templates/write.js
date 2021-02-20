import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const WriteForUsTemplate = ({ data }) => (
  <Layout>
    <div>{data.strapiWriteForUs.title}</div>
    <div className="prose tracking-normal text-black text-center text-lg max-w-full">
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