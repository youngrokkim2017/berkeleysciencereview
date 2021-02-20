import React from "react";
// import Layout from "../components/layout"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
import Preview from "../components/preview"
import Header from "../components/header"
import Footer from "../components/footer"
import MailchimpComponentHome from '../components/mailchimpHome'

// import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'
// // new Glide('.glide').mount({ Controls, Breakpoints })

// import React, { useRef } from 'react';
// import Glide, { Slide } from 'react-glidejs';
// import Glide from 'react-glidejs';
// import 'react-glidejs/dist/index.css';

const IndexPage = ({ data }) => {

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  // const sortedByDate = this.props.data.allStrapiArticle.edges.sort((a, b) => {
  const sortedByDate = data.allStrapiArticle.edges.sort((a, b) => {
    let aDate = parseInt(a.node.published_at.split("T")[0].split("-").join(""))
    let bDate = parseInt(b.node.published_at.split("T")[0].split("-").join(""))
    return (bDate - aDate)
  });

  const recentArticles = sortedByDate.slice(0, 3);

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
    document.node.categories.map(cat => cat.title).includes('Life Science')
  )).slice(0, 7);

  const heroArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Climate Change')
  )).slice(0, 1);

  // const gliderRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={data.allStrapiCategory.edges} />
      <main className='container mx-auto px-4 sm:px-0'>
        <div className="pb-12 mx-auto">
          {/* <Glide
            ref={gliderRef}
            throttle={0}
            type="carousel"
            customSlideAnimation={{
              timeout: 500,
              classNames: 'fade',
            }}
            autoplay={7000}
            perView={1}
            startAt={0}
            focusAt="center"
          >          
            {recentArticles.map(document => (
              <li key={document.node.id}>
                {document.node.image ? <img src={document.node.image.publicURL} className="object-cover w-36 h-36" alt="" /> : ""}
                <p>{document.node.title}</p>
              </li>
            ))}
          </Glide> */}

          <ul>
            {heroArticles.map(document => (
              <li key={document.node.id} style={{ borderBottomColor: '#e2e2e2' }}>


                <div className="text-center">


                  {document.node.image
                    ?
                    <div className="mr-6">
                      <img src={document.node.image.publicURL} alt="" className="m-0 p-0 text-center mx-auto mb-6 w-3/5" />
                    </div>
                    :
                    ""
                  }
                  <h2 className="text-4xl">{document.node.title}</h2>

                  <span className="">
                    <p>
                      {document.node.author.name}
                    </p>
                    <p>
                      {handleDate(document.node.published_at)}
                    </p>
                  </span>

                </div>

              </li>
            ))}
          </ul>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Popular
          </h1>
            <ul>
              {popularArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Latest
          </h1>
            <ul>
              {recentArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="medium" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
                Magazine
              </h1>
            </div>
            <div>
              <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
                Newsletter
              </h1>
              <MailchimpComponentHome />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Labscopes
          </h1>
            <ul>
              {labscopesArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Noteworthy News
          </h1>
            <ul>
              {noteworthyArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Climate Change
          </h1>
            <ul>
              {climateChangeArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Life Science
          </h1>
            <ul>
              {lifeScienceArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>


  )
}

export default IndexPage;

// gql query
export const splashQuery = graphql`
  query SplashQuery {
    allStrapiArticle(
      sort: { order: DESC, fields: published_at }
    ) {
      edges {
        node {
          id
          title
          author {
            name
          }
          content
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
    allStrapiCategory {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

// export const splashQuery = graphql`
//   query SplashQuery {
//     allStrapiArticle(
//       sort: { order: DESC, fields: published_at }
//     ) {
//       edges {
//         node {
//           id
//           image {
//             publicURL
//           }
//           title
//           author {
//             name
//           }
//           content
//           categories {
//             id
//             title
//           }
//           published_at
//           updatedAt
//         }
//       }
//     }
//   }
// `