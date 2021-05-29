import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import Seo from "../components/seo"

const JoinUsTemplate = ({ data }) => (
  <Layout>
    <Seo
      title={data.strapiJoinUs.title}
    />
    <h2 className="font-normal mb-8 pb-2 text-4xl border-b border-black">{data.strapiJoinUs.title}</h2>
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