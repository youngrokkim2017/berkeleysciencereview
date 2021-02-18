// import React from "react";
import Layout from "../components/layout"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
import Preview from "../components/preview"

// import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'
// // new Glide('.glide').mount({ Controls, Breakpoints })

import React, { useRef } from 'react';
// import Glide, { Slide } from 'react-glidejs';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

const IndexPage = ({ data }) => {
  // const sortedByDate = this.props.data.allStrapiArticle.edges.sort((a, b) => {
  const sortedByDate = data.allStrapiArticle.edges.sort((a, b) => {
    let aDate = parseInt(a.node.published_at.split("T")[0].split("-").join(""))
    let bDate = parseInt(b.node.published_at.split("T")[0].split("-").join(""))
    return (bDate - aDate)
  });

  const recentArticles = sortedByDate.slice(0, 3);

  const labscopeArticles = sortedByDate.filter(document => (
    // document.node.categories.map(cat => cat.title === 'Labscope')
    document.node.categories.map(cat => cat.title)[0] === 'Labscope'
    // document.node.categories.map(cat => cat.title).includes(‘Labscope’)
    // document.node.categories[0].title === 'Labscope'
  )).slice(0, 5);

  const noteworthyArticles = sortedByDate.filter(document => (
    // document.node.categories.map(cat => cat.title === 'Noteworthy News')
    document.node.categories.map(cat => cat.title)[0] === 'Noteworthy News'
    // document.node.categories.map(cat => cat.title).includes('Noteworthy News')
    // document.node.categories[0].title === 'Noteworthy News'
  )).slice(0, 5);

  // var slider = document.querySelector('.glide');

  // if (slider) {
  //   var glide = new Glide(slider, {
  //     type: 'carousel',
  //     startAt: 0,
  //     perView: 1,
  //   });
  //   // }).mount({ Controls, Breakpoints });
  //   // }).mount();

  //   // glide.mount();
  // }

  // useEffect(() => {
  //   return () => glide.mount({ Controls, Breakpoints })
  // }, [glide])

  const gliderRef = useRef(null);

  return (
    <Layout>
      <div>
        {/* <div className="glide">
          <div className="glide__arrows" data-glide-el="controls">
            <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
              Prev
            </button>
          </div>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {recentArticles.map(document => (
                <li className="glide__slide" key={document.node.id}>
                  {document.node.image ? <img src={document.node.image.publicURL} className="object-cover w-20 h-20" alt="" /> : ""}
                  <p>{document.node.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
              Next
            </button>
          </div>
        </div> */}

        <div>
          <Glide
            ref={gliderRef}
            throttle={0}
            type="carousel"
            customSlideAnimation={{
              timeout: 500,
              classNames: 'fade',
            }}
            perView={1}
            startAt={0}
            focusAt="center"
          >          
            {recentArticles.map(document => (
              <li key={document.node.id}>
                {document.node.image ? <img src={document.node.image.publicURL} className="object-cover w-20 h-20" alt="" /> : ""}
                <p>{document.node.title}</p>
              </li>
            ))}
          </Glide>
        </div>

        <div>
          <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black leading-none'>
            Latest
          </h2>
          <ul>
            {recentArticles.map(document => (
              <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                <Preview article={document.node} format="small" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black leading-none'>
            Labscope
          </h2>
          <ul>
            {labscopeArticles.map(document => (
              <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                <Preview article={document.node} format="small" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black leading-none'>
            Noteworthy
          </h2>
          <ul>
            {noteworthyArticles.map(document => (
              <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                <Preview article={document.node} format="small" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
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