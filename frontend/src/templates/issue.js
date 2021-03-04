import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import { SizeMe } from 'react-sizeme'

// import { Document, Page, pdfjs } from "react-pdf"
import { pdfjs } from "react-pdf"
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
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
      <div className="px-4 sm:px-6 xl:px-6 mx-auto">
        <div className="mb-8 pb-4 border-b border-black">
          <h2 className="font-normal text-4xl leading-tight mb-2">{data.strapiMagazineIssue.title}</h2>
          {pdfOpen && data.strapiMagazineIssue.pdf ?
            <button onClick={() => setpdfOpen(false)} className="font-medium underline">View the Articles</button>
            :
            <button onClick={() => setpdfOpen(true)} className="font-medium underline">View the PDF</button>
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
                  defaultScale={SpecialZoomLevel.PageFit}
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
                    <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                      <h2 className="font-medium mb-2 text-2xl leading-none">{document.title}</h2>
                    </Link>
                    <p className='my-2'>
                      {handleDate(document.published_at)}
                    </p>
                    {data.allStrapiAuthors.edges.map(author => (
                      <p className='mb-2 text-base' key={author.node.id}>
                        {author.node.id.split("_")[1] === document.author ?
                          <>By <Link
                            className="font-medium underline"
                            to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                            {author.node.name}
                          </Link>
                          </>
                          :
                          ""
                        }
                      </p>
                    ))}
                  </div>
                  {document.image ?
                    <div>
                      <img src={document.image.publicURL} style={{ maxWidth: '200px' }} alt="" />
                    </div>
                    :
                    ""
                  }
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </Layout >
  )
}

// class MagazineIssueTemplate extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       numPages: null,
//       pageNumber: 1,
//     }
//   }

//   onDocumentLoad = ({ numPages }) => {
//     this.setState({ numPages });
//   }

//   render() {
//     const { data } = this.props;
//     const { pageNumber, numPages } = this.state;

//     function handleDate(e) {
//       var d = new Date(e);
//       const options = { year: 'numeric', month: 'long', day: 'numeric' };
//       return d.toLocaleDateString(undefined, options)
//     }

//     return (
//       <Layout>
//         <div className="px-4 sm:px-6 xl:px-6 mx-auto">
//           <div className="mb-8 pb-4 border-b border-black">
//             <h2 className="font-normal text-4xl leading-tight mb-2">{data.strapiMagazineIssue.title}</h2>
//             <Link to={'/'} className="font-medium underline">View the PDF</Link>
//           </div>

//           {data.strapiMagazineIssue.pdf ?
//             <div className="mx-auto text-center mt-12 sans-serif">
//               <div className="max-w-full">
//                 <SizeMe>
//                 {({ size }) => (
//                   <Viewer
//                     fileUrl={data.strapiMagazineIssue.pdf.publicURL}
//                     width={size.width ? size.width : 1}
//                     // plugins={[
//                     //   defaultLayoutPlugin({
//                     //     toolbarPlugin: {
//                     //       fullScreenPlugin: {
//                     //         // Zoom to fit the screen after entering and exiting the full screen mode
//                     //         onEnterFullScreen: (zoom) => {
//                     //           zoom(SpecialZoomLevel.PageFit);
//                     //         },
//                     //         onExitFullScreen: (zoom) => {
//                     //           zoom(SpecialZoomLevel.PageFit);
//                     //         },
//                     //       },
//                     //     },
//                     //   }),
//                     // ]}
//                   />
//                 )}
//                 </SizeMe>
//                 {/* <SizeMe>
//                   {({ size }) => (
//                     <Document file={data.strapiMagazineIssue.pdf.publicURL} onLoadSuccess={this.onDocumentLoad}>
//                       <Page pageNumber={pageNumber} width={size.width ? size.width : 1}/>
//                     </Document>
//                   )}
//                 </SizeMe> */}
//               </div>
//               {this.state.numPages ?
//                 <nav class="relative z-10 mt-8 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                   <button onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }))} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Previous</span>
//                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
//                     </svg>
//                   </button>
//                   <span className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <p>Page {pageNumber} of {numPages}</p>
//                   </span>
//                   <button onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }))} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Previous</span>
//                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
//                     </svg>
//                   </button>
//                 </nav>
//                 :
//                 ""
//               }
//             </div>
//             :
//             ""
//           }
//           <ul className="mb-12">
//             {data.strapiMagazineIssue.articles.map(document => (
//               <li key={document.id} className="mt-6 pb-6 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
//                 <div className="flex items-start">

//                   <div className="mr-6 flex-grow">
//                     <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
//                       <h2 className="font-medium mb-2 text-2xl leading-none">{document.title}</h2>
//                     </Link>
//                     <p className='my-2'>
//                       {handleDate(document.published_at)}
//                     </p>
//                     {data.allStrapiAuthors.edges.map(author => (
//                       <p className='mb-2 text-base' key={author.node.id}>
//                         {author.node.id.split("_")[1] === document.author ?
//                           <>By <Link
//                             className="font-medium underline"
//                             to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
//                             {author.node.name}
//                           </Link>
//                           </>
//                           :
//                           ""
//                         }
//                       </p>
//                     ))}
//                   </div>
//                   {document.image ?
//                     <div>
//                       <img src={document.image.publicURL} style={{ maxWidth: '200px' }} alt="" />
//                     </div>
//                     :
//                     ""
//                   }
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Layout >
//     )
//   }
// }


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
        content
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