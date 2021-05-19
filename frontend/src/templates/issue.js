import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { pdfjs } from "react-pdf"
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MagazineIssueTemplate = ({ data }) => {

  const handleDate = e => {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfOpen, setpdfOpen] = useState(false);

  return (
    <Layout>
      <div className="mb-8 pb-4 border-b border-black">
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
            <div
              style={{
                height: '750px',
              }}
            >
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
          {data.strapiMagazineIssue.articles.map(document => (
            <li key={document.id} className="mt-6 pb-6 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
              <div className="flex items-start">
                <div className="mr-6 flex-grow">
                  {document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")[document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").length - 1] === "-" ?
                    <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").slice(0, -1)}`}>
                      <h2 className="text-base mb-2 md:text-2xl">{document.title}</h2>
                    </Link>
                    :
                    <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                      <h2 className="text-base mb-2 md:text-2xl">{document.title}</h2>
                    </Link>
                  }
                  <div className="text-sm md:text-base lg:text-sm">
                    <p className='mb-2'>
                      {data.allStrapiAuthors.edges.map(author => (
                        document.authors.map(currAuthor => (
                          <>
                            {currAuthor === author.node.id.split("_")[1] ?
                              <>
                                <Link
                                  className="font-medium"
                                  to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}
                                >
                                  {author.node.name}
                                </Link>
                              </>
                              :
                              ""
                            }
                          </>
                        ))
                      ))}
                    </p>
                    <p>
                      {handleDate(document.published_at)}
                    </p>
                  </div>
                </div>
                {document.image ?
                  <div className="flex-shrink-0">
                    <img src={document.image.publicURL} className="w-20 h-20 object-cover md:object-fit md:h-full md:w-48" alt=""  />
                  </div>
                  :
                  ""
                }
              </div>
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
    strapiMagazineIssue(id: { eq: $id }) {
      id
      title
      issue
      articles {
        id
        title
        author
        image {
          publicURL
        }
        published_at
      }
      pdf {
        publicURL
      }
    }
    allStrapiAuthors {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`