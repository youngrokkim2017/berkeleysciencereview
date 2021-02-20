import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const AboutUsTemplate = ({ data }) => (
  <Layout>
    <div>{data.strapiAboutUs.title}</div>
    <div className="prose tracking-normal text-black text-center text-lg max-w-full">
      <ReactMarkdown source={data.strapiAboutUs.content} />
    </div>
  </Layout>
)

export default AboutUsTemplate;

export const query = graphql`
  query AboutUsTemplate($id: String!) {
    strapiAboutUs(id: { eq: $id }) {
      title
      content
    }
  }
`