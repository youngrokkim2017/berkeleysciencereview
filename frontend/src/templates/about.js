import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const AboutUsTemplate = ({ data }) => (
  <Layout>
      <h2 className="font-normal mb-8 text-4xl leading-tight">{data.strapiAboutUs.title}</h2>
      <div className="flex-grow flex-shrink-0 prose tracking-normal text-black max-w-full">
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