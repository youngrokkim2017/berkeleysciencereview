import React from "react"
import { Link, graphql } from "gatsby"

import Preview from "../components/preview"

import Header from "../components/header"
import Footer from "../components/footer"

import MailchimpComponentHome from '../components/mailchimpHome'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  // fade: true,
  // adaptiveHeight: true,
};

const IndexPage = ({ data }) => {

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  const sortedByDate = data.allStrapiArticle.edges.sort((a, b) => {
    let aDate = parseInt(a.node.published_at.split("T")[0].split("-").join(""))
    let bDate = parseInt(b.node.published_at.split("T")[0].split("-").join(""))
    return (bDate - aDate)
  });

  const recentArticles = sortedByDate.slice(0, 5);

  const labscopesArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Labscopes')
  )).slice(0, 3);

  const noteworthyArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Noteworthy News')
  )).slice(0, 3);

  const climateChangeArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Climate Change')
  )).slice(0, 3);

  const lifeScienceArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Life Science')
  )).slice(0, 3);

  const popularArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Noteworthy News')
  )).slice(0, 6);

  const latestIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue)[0];

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={data} />
      <main className='container mx-auto px-4 md:px-8 lg:px-4'>
        <div className="mb-16 mx-auto">
          <div>
            <Slider {...settings}>
              {recentArticles.map(document => (
                // <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`} key={document.node.title}>
                //   <div className="text-center">
                //     {document.node.image
                //       ?
                //       <div className="">
                //         <img src={document.node.image.publicURL} alt="" className="m-0 p-0 text-center mx-auto mb-6 object-cover h-48 sm:w-3xl sm:h-96" />
                //       </div>
                //       :
                //       ""
                //     }
                //     <h2 className="text-4xl mb-2">{document.node.title}</h2>
                //     <p>
                //       {/* {document.node.author.name} */}
                //       {document.node.authors.map(author => (
                //         <span 
                //           key={author.id}
                //         >
                //           {author.name}
                //         </span>
                //       ))}
                //     </p>
                //     <p>
                //       {handleDate(document.node.published_at)}
                //     </p>
                //   </div>
                // </Link>
                <>
                {document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")[document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").length - 1] === "-" ?
                  <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").slice(0, -1)}`} key={document.node.title}>
                    <div className="text-center">
                      {document.node.image
                        ?
                        <div className="">
                          <img src={document.node.image.publicURL} alt="" className="m-0 p-0 text-center mx-auto mb-6 object-cover h-48 sm:w-3xl sm:h-96" />
                        </div>
                        :
                        ""
                      }
                      <h2 className="text-4xl mb-2">{document.node.title}</h2>
                      <p>
                        {/* {document.node.author.name} */}
                        {document.node.authors.map(author => (
                          <span 
                            key={author.id}
                          >
                            {author.name}
                          </span>
                        ))}
                      </p>
                      <p>
                        {handleDate(document.node.published_at)}
                      </p>
                    </div>
                  </Link>
                :
                  <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`} key={document.node.title}>
                    <div className="text-center">
                      {document.node.image
                        ?
                        <div className="">
                          <img src={document.node.image.publicURL} alt="" className="m-0 p-0 text-center mx-auto mb-6 object-cover h-48 sm:w-3xl sm:h-96" />
                        </div>
                        :
                        ""
                      }
                      <h2 className="text-4xl mb-2">{document.node.title}</h2>
                      <p>
                        {/* {document.node.author.name} */}
                        {document.node.authors.map(author => (
                          <span 
                            key={author.id}
                          >
                            {author.name}
                          </span>
                        ))}
                      </p>
                      <p>
                        {handleDate(document.node.published_at)}
                      </p>
                    </div>
                  </Link>
                }
                </>
              ))}
            </Slider>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 xl:gap-x-12 gap-y-12 mb-6 sm:mb-12">
          <div>
            <h1 className='text-2xl font-medium pb-3 border-b border-black'>
              Popular
          </h1>
            <ul>
              {popularArticles.map(document => (
                <li key={document.node.id} className="py-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small" />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h1 className='text-2xl font-medium pb-3 border-b border-black'>
              Latest
          </h1>
            <ul>
              {recentArticles.map(document => (
                <li key={document.node.id} className="py-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="medium" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div>
                <h1 className='text-2xl font-medium pb-3 mb-4 border-b border-black'>
                  Newsletter
              </h1>
                <MailchimpComponentHome />
              </div>
              <div>
                <h1 className='text-2xl font-medium pb-3 mb-4 border-b border-black'>
                  Magazine
              </h1>
                <Link to={`/magazine/${latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                  {/* <Document
                  file={latestIssue.node.pdf.publicURL}
                >
                  <Page pageNumber={1} />
                </Document> */}
                  <img src={latestIssue.node.thumbnail.publicURL} alt="" />
                </Link>
                {latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-")[latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-").length - 1] === "-" ?
                  <Link to={`/magazine/${latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-").slice(0, -1)}`}>
                    {/* <Document
                    file={latestIssue.node.pdf.publicURL}
                  >
                    <Page pageNumber={1} />
                  </Document> */}
                    {/* <img src={latestIssue.node.thumbnail.publicURL} alt="" /> */}
                  </Link>
                :
                  <Link to={`/magazine/${latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                    {/* <Document
                    file={latestIssue.node.pdf.publicURL}
                  >
                    <Page pageNumber={1} />
                  </Document> */}
                    {/* <img src={latestIssue.node.thumbnail.publicURL} alt="" /> */}
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-12 gap-y-6 -mb-6 sm:mb-0">
          <div>
            <h1 className='text-2xl font-medium pb-3 border-b border-black'>
              Labscopes
          </h1>
            <ul>
              {labscopesArticles.map(document => (
                <li key={document.node.id} className="py-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-2xl font-medium pb-3 border-b border-black'>
              Noteworthy News
          </h1>
            <ul>
              {noteworthyArticles.map(document => (
                <li key={document.node.id} className="py-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-2xl font-medium pb-3 border-b border-black'>
              Climate Change
          </h1>
            <ul>
              {climateChangeArticles.map(document => (
                <li key={document.node.id} className="py-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-2xl font-medium pb-3 border-b border-black'>
              Life Science
          </h1>
            <ul>
              {lifeScienceArticles.map(document => (
                <li key={document.node.id} className="py-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <a href="https://forms.gle/QnnTu8sfCAGKkdWe7" id="report" className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-3 text-white rounded-full space-x-4 sans-serif">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block align-middle" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="inline-block align-middle">
            <p className="m-0 p-0 text-lg font-extrabold">Notice something wrong?</p>
            <p>Please report it here.</p>
          </span>
        </a>
      <Footer />
    </div>
  )
}

export default IndexPage;

// gql query
// export const splashQuery = graphql`
//   query SplashQuery {
//     allStrapiArticle(
//       sort: { order: DESC, fields: published_at }
//     ) {
//       edges {
//         node {
//           id
//           title
//           subtitle
//           authors {
//             id
//             name
//           }
//           image {
//             publicURL
//           }
//           categories {
//             id
//             title
//           }
//           published_at
//           updatedAt
//         }
//       }
//     }
//     allStrapiMagazineIssue(
//       sort: {order: DESC, fields: issue}
//     ) {
//       edges {
//         node {
//           id
//           issue
//           title
//         }
//       }
//     }
//   }
// `

export const splashQuery = graphql`
  query SplashQuery {
    allStrapiArticle(
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
          updatedAt
        }
      }
    }
    allStrapiMagazineIssue(
      sort: {order: DESC, fields: issue}
    ) {
      edges {
        node {
          id
          issue
          title
          thumbnail {
            publicURL
          }
        }
      }
    }
  }
`

          