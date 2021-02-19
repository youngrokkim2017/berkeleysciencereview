import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const JoinUsTemplate = ({ data }) => (
  <Layout>
    <div>{data.strapiJoinUs.title}</div>
    <div className="prose tracking-normal text-black text-center text-lg max-w-full">
      <ReactMarkdown source={data.strapiJoinUs.content} />
    </div>
  </Layout>
)

export default JoinUsTemplate;

export const query = graphql`
  query JoinUsTemplate($id: String!) {
    strapiJoinUs(id: { eq: $id }) {
      title
      content
    }
  }
`