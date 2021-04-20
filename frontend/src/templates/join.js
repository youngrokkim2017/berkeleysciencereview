import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const JoinUsTemplate = ({ data }) => (
  <Layout>
      <h2 className="font-normal mb-8 text-4xl leading-tight">{data.strapiJoinUs.title}</h2>
      <div className="flex-grow flex-shrink-0 prose tracking-normal text-black max-w-full">
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