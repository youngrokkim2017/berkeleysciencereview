import React, { useState, useEffect } from 'react'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
// import ReactMarkdown from "react-markdown"

const CategoryTemplate = ({ data }) => {
  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  const sortedByDate = data.strapiCategory.articles.sort((a, b) => {
    let aDate = parseInt(a.published_at.split("T")[0].split("-").join(""))
    let bDate = parseInt(b.published_at.split("T")[0].split("-").join(""))
    return (bDate - aDate)
  })

  const [list, setList] = useState([...sortedByDate.slice(0, 10)])
  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false)
  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(sortedByDate.length > 10)
  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }
  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < sortedByDate.length
      const nextResults = isMore
        ? sortedByDate.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line
  //Check if there is more
  useEffect(() => {
    const isMore = list.length < sortedByDate.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  return (
    <Layout>
      <div className="">
        <h2 className="font-normal mb-12 pb-8 text-4xl leading-tight border-b border-black">{data.strapiCategory.title}</h2>
        <ul className="mb-12">
          {list.map(document => (
            <li key={document.id} className="mt-8 pb-8 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
              <div className="flex items-start">
                {document.image ?
                  <div className="mr-6">
                    <img src={document.image.publicURL} style={{ maxWidth: '200px' }} alt="" />
                  </div>
                  :
                  ""
                }
                <div>
                  <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                    <h2 className="font-medium mb-2 text-3xl leading-none">{document.title}</h2>
                  </Link>
                  <p className='my-0'>
                    {handleDate(document.published_at)}
                  </p>
                  {/* <ReactMarkdown
                    source={`${document.content.slice(0, 300)}...`}
                    className="mb-4"
                  /> */}
                  {data.allStrapiAuthors.edges.map(author => (
                    <p className='mb-2 text-base' key={author.node.id}>
                      {author.node.id.split("_")[1] === document.author ?
                        <Link 
                          className="font-medium underline"
                          to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}
                        >
                          By {author.node.name}
                        </Link>
                        :
                        ""
                      }
                    </p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {hasMore ? (
          <button onClick={handleLoadMore} className="sans-serif inline-block px-4 py-2 leading-none text-white bg-black flex-shrink-0 cursor-pointer rounded">Load More</button>
        ) : (
            <p>No more results</p>
          )}
      </div>
    </Layout>
  )
}

export default CategoryTemplate;

export const query = graphql`
  query CategoryTemplate($id: String!) {
    strapiCategory(id: { eq: $id }) {
      id
      title
      articles {
        id
        title
        author
        content
        image {
          publicURL
        }
        magazine
        published_at
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

// export const query = graphql`
//   query CategoryTemplate($id: String!) {
//     strapiCategory(id: { eq: $id }) {
//       id
//       title
//       articles {
//         id
//         title
//         author
//         content
//         magazine
//         image {
//           publicURL
//         }
//         published_at
//       }
//     }
//     allStrapiAuthors {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `

// /////////////////////////////  INFINTE SCROLLING  ///////////////////////////

// // import React from "react"
// import React, { useState, useEffect } from 'react'
// // import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
// // import Img from "gatsby-image"
// import Layout from "../components/layout"
// import ReactMarkdown from "react-markdown"
// // import Preview from "../components/preview"

// const CategoryTemplate = ({ data }) => {
//   const sortedByDate = data.strapiCategory.articles.sort((a, b) => {
//     let aDate = parseInt(a.published_at.split("T")[0].split("-").join(""))
//     let bDate = parseInt(b.published_at.split("T")[0].split("-").join(""))
//     return (bDate - aDate)
//   // }).slice(0, 10)
//   })

// //   const [ active, setActive ] = useState(0)
// //   const [ hasMore, setMore ] = useState(edges.length > 10)
//   // const [ hasMore, setMore ] = useState(data.strapiCategory.articles.length > 10)
//   const [ hasMore, setMore ] = useState(sortedByDate.length > 10)
// //   const [ currentList, addToList ] = useState([...edges.slice(0, 10)])
//   // const [ currentList, addToList ] = useState([...data.strapiCategory.articles.slice(0, 10)])
//   const [ currentList, addToList ] = useState([...sortedByDate.slice(0, 10)])

//   const loadEdges = () => {
//     const currentLength = currentList.length
//     // const more = currentLength < edges.length
//     // const more = currentLength < data.strapiCategory.articles.length
//     const more = currentLength < sortedByDate.length
//     // const nextEdges = more ? edges.slice(currentLength, currentLength + 20) : []
//     // const nextEdges = more ? data.strapiCategory.articles.length.slice(currentLength, currentLength + 20) : []
//     const nextEdges = more ? sortedByDate.slice(currentLength, currentLength + 20) : []
//     setMore(more)
//     addToList([...currentList, ...nextEdges])
//   }

//   const handleScroll = () => {
//     // if ( !hasMore || isLoading ) return;
//     if ( !hasMore ) return;
//     // if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight ){
//     if ( window && (
//        ( window.innerHeight + document.documentElement.scrollTop ) >= document.documentElement.offsetHeight )
//     ){
//       loadEdges()
//     }
//   }

// //   const handleTouchEnd = (e) => {
// //     e.preventDefault(); 
// //     handleScroll();
// //   }
//   const handleTouchEnd = (e) => {
//     if (e.target.tagName !== "a") {
//       e.preventDefault(); 
//       handleScroll();
//     } else {
//       console.log("this makes me a click event, most likely")
//     }
//   }

//   useEffect(() => {
//     window && window.addEventListener('scroll', handleScroll)
//     window && window.addEventListener('resize', handleScroll)
//     window && window.addEventListener('touchend', handleTouchEnd)
//     return () => {
//       window && window.removeEventListener('scroll', handleScroll)
//       window && window.removeEventListener('resize', handleScroll)
//       window && window.removeEventListener('touchend', handleTouchEnd)
//     }
// //   }, [hasMore, currentList])
//   })

//   return (
//     <Layout>
//       <div className="">
//         <h2 className="font-normal mb-12 text-4xl leading-tight">{data.strapiCategory.title}</h2>
//         <ul>
//           {/* {data.strapiCategory.articles.sort((a, b) => b.published_at - a.published_at).slice(0, 10).map(document => ( */}
//           {sortedByDate.map((document, idx) => (
//             // <li key={document.id} className="mb-4">
//             //   <Preview article={document} format="medium" />
//             // </li>
//           <li key={document.id} className="mb-4">
//             <div className="flex items-start">
//               {/* {document.image ?
//                 <div className="mr-6">
//                   <img src={document.image.publicURL} />
//                 </div>
//                 :
//                 ""
//               } */}
//               <div>
//                 <Link to={`/article/${document.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}>
//                   <h2 className="font-normal mb-4 text-2xl leading-tight">{document.title}</h2>
//                 </Link>
//                 <ReactMarkdown
//                   source={`${document.content.slice(0, 300)}...`}
//                   transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
//                   className="mb-4"
//                 />
//                 {data.allStrapiAuthors.edges.map(author => (
//                   <p className='mb-2 text-base' key={author.node.id}>
//                     {+author.node.id.split("_")[1] === document.author ?
//                       <Link 
//                         className="font-medium underline"
//                         to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}
//                       >
//                         By {author.node.name}
//                       </Link>
//                       :
//                       ""
//                     }
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </li>
//           ))}
//         </ul>
//         {
//           !hasMore &&
//             <div>All Businesses Loaded!</div>
//         }
//         {
//           hasMore &&
//             <div>Scroll Down to Load More...</div>
//         }
//       </div>  
//     </Layout>
//   )
// }

// export default CategoryTemplate;

// //////////////////////////////  DEFAULT  //////////////////////////////

// // import React from "react"
// import React, { useState, useEffect } from 'react'
// // import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
// // import Img from "gatsby-image"
// import Layout from "../components/layout"
// import ReactMarkdown from "react-markdown"
// // import Preview from "../components/preview"

// const CategoryTemplate = ({ data }) => {
//   const sortedByDate = data.strapiCategory.articles.sort((a, b) => {
//     let aDate = parseInt(a.published_at.split("T")[0].split("-").join(""))
//     let bDate = parseInt(b.published_at.split("T")[0].split("-").join(""))
//     return (bDate - aDate)
//   }).slice(0, 10)

//   return (
//   <Layout>
//     <div className="">
//       <h2 className="font-normal mb-12 text-4xl leading-tight">{data.strapiCategory.title}</h2>
//     <ul>
//       {/* {data.strapiCategory.articles.sort((a, b) => b.published_at - a.published_at).slice(0, 10).map(document => ( */}
//       {sortedByDate.map(document => (
//         // <li key={document.id} className="mb-4">
//         //   <Preview article={document} format="medium" />
//         // </li>
//       <li key={document.id} className="mb-4">
//         <div className="flex items-start">
//           {/* {document.image ?
//             <div className="mr-6">
//               <img src={document.image.publicURL} />
//             </div>
//             :
//             ""
//           } */}
//           <div>
//             <Link to={`/article/${document.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}>
//               <h2 className="font-normal mb-4 text-2xl leading-tight">{document.title}</h2>
//             </Link>
//             <ReactMarkdown
//               source={`${document.content.slice(0, 300)}...`}
//               transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
//               className="mb-4"
//             />
//             {data.allStrapiAuthors.edges.map(author => (
//               <p className='mb-2 text-base' key={author.node.id}>
//                 {+author.node.id.split("_")[1] === document.author ?
//                   <Link 
//                     className="font-medium underline"
//                     to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}
//                   >
//                     By {author.node.name}
//                   </Link>
//                   :
//                   ""
//                 }
//               </p>
//             ))}
//           </div>
//         </div>
//       </li>
//       ))}
//     </ul>
//     </div>
//   </Layout>
//   )
// }

// export default CategoryTemplate;

// export const query = graphql`
//   query CategoryTemplate($id: String!) {
//     strapiCategory(id: { eq: $id }) {
//       id
//       title
//       articles {
//         id
//         title
//         author
//         content
//         magazine
//         image {
//           publicURL
//         }
//         published_at
//       }
//     }
//     allStrapiAuthors {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `