import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Preview from "../components/preview"
import { pdfjs } from "react-pdf"
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Seo from "../components/seo"

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MagazineIssueTemplate = ({ data }) => {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfOpen, setpdfOpen] = useState(false);

  return (
    <Layout>
      <Seo
        title={data.strapiMagazineIssue.title}
        image={data.strapiMagazineIssue.thumbnail ? data.strapiMagazineIssue.thumbnail.publicURL : false}
      />
      <div className="pb-4 border-b border-black">
        <h2 className="font-normal text-4xl mb-2">{data.strapiMagazineIssue.title}</h2>
        {pdfOpen && data.strapiMagazineIssue.pdf ?
          <button onClick={() => setpdfOpen(false)} className="font-medium underline">View the Articles</button>
          :
          <>
            {data.strapiMagazineIssue.pdf ?
              <button onClick={() => setpdfOpen(true)} className="font-medium underline">View the PDF</button>
              :
              ""
            }
          </>
        }
      </div>

      {pdfOpen && data.strapiMagazineIssue.pdf ?
        <div className="mx-auto text-center mt-6 sans-serif">
          <div className="max-w-full">
            <div className="height-750">
              <Viewer
                fileUrl={data.strapiMagazineIssue.pdf.publicURL}
                plugins={[
                  defaultLayoutPluginInstance,
                ]}
              />
            </div>
          </div>
        </div>
        :
        <ul className="mb-12">
          {data.allStrapiArticle.edges.map(document => (
            <li key={document.node.id} className="py-4 border-b border-bottom-gray">
              <Preview article={document.node} format="medium" />
            </li>
          ))}
        </ul>
      }
    </Layout>
  )
}

export default MagazineIssueTemplate

export const query = graphql`
query MagazineIssueTemplate($id: String!) {
  strapiMagazineIssue(strapiId: { eq: $id }) {
    id
    title
    issue
    thumbnail {
      publicURL
    }
    pdf {
      publicURL
    }
  }
  allStrapiArticle(
    filter: {magazine: {id: {eq: $id}}}
    sort: { order: DESC, fields: published_at }
  ) {
    edges {
      node {
        id
        title
        authors {
          id
          name
        }
        image {
          publicURL
        }
        categories {
          id
          title
        }
        published_at
      }
    }
  }
}
`