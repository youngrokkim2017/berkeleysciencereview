import React, { useState, useEffect } from 'react'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

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

  // let authorIDList = data.allStrapiAuthors.edges.map(author => (
  //   [author.node.id.split("_")[1], author.node.name]
  // ));

  // function filterAuthors(authors, check) {
  //   let results = [];
  //   authors.map(currAuthor => (
  //     check.map(checkAuthor => {
  //       if (currAuthor === checkAuthor[0]) {
  //         results.push([checkAuthor[0],checkAuthor[1]])
  //       }
  //     })
  //   ))
  //   return results;
  // }

  // let authorList = list.map(document => (
  //   filterAuthors(document.authors, authorIDList)
  // ))

  // function getArticleAuthor(authorData, checkList) {
  //   let results = []
  //   authorData.map(document => (
  //     document.authors.map(currAuthor => (
  //       filterAuthors(document.authors, checkList).map(checkAuthor => {
  //         if (currAuthor === checkAuthor[0]) {
  //           results.push(checkAuthor[1])
  //         }
  //       })
  //     ))
  //   ))
  //   return results;
  // }

  return (
    <Layout>
      <h2 className="font-normal mb-8 pb-2 text-4xl border-b border-black">{data.strapiCategory.title}</h2>
      <ul className="mb-12">

        {list.map(document => (
          <li key={document.id} className="mt-6 pb-6 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
            <div className="flex items-start">
              <div className="mr-6 flex-grow">
                {document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")[document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").length - 1] === "-" ?
                  <div>
                    <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").slice(0, -1)}`}>
                      <h2 className="text-base mb-2 md:text-2xl">{document.title}</h2>
                    </Link>
                  </div>
                  :
                  <div>
                    <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                      <h2 className="text-base mb-2 md:text-2xl">{document.title}</h2>
                    </Link>
                  </div>
                }
                {document.subtitle ?
                  <h3 className="mb-4 text-sm">
                    {document.subtitle}
                  </h3>
                  :
                  ""
                }
                <div className="text-sm md:text-base lg:text-sm">
                  <p className='mb-2'>
                    {/* {getArticleAuthor(list, authorIDList)} */}

                    {/* {data.allStrapiAuthors.edges.map(author => (
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
                    ))} */}
                    
                    {/* {document.authors.map(currAuthor => (
                      data.allStrapiAuthors.edges.map(author => (
                        <div>
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
                        </div>
                      ))
                    ))} */}

                    {/* {document.authors.map(currAuthor => (
                      <>
                      {filterAuthors(document.authors, authorIDList).map(checkAuthor => (
                        <>
                          {currAuthor === checkAuthor[0] ?
                            <>
                              <Link
                                className="font-medium"
                                to={`/author/${checkAuthor[1].split(" ").map((a) => a.toLowerCase()).join("-")}`}
                              >
                                {checkAuthor[1]}
                              </Link>
                            </>
                            :
                            ""
                          }
                        </>
                      ))}
                      </>
                    ))} */}

                    {document.authors.length === 1 ?
                      <>
                        {document.authors.map(currAuthor => (
                          data.allStrapiAuthors.edges.map(author => (
                            <div>
                              {currAuthor === author.node.id.split("_")[1] ?
                                <>
                                  By <Link
                                    className="font-medium"
                                    to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}
                                  >
                                    {author.node.name}
                                  </Link>
                                </>
                                :
                                ""
                              }
                            </div>
                          ))
                        ))}
                      </>
                    : document.authors.length === 2 ?
                      <>
                        {data.allStrapiAuthors.edges.map(author => (
                          <>
                            {document.authors[0] === author.node.id.split("_")[1] ?
                              <>
                                By <Link
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
                        ))}
                        <span> and </span>
                        {data.allStrapiAuthors.edges.map(author => (
                          <>
                            {document.authors[document.authors.length - 1] === author.node.id.split("_")[1] ?
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
                        ))}
                      </>
                    :
                      <>
                        {data.allStrapiAuthors.edges.map(author => (
                          <>
                            {document.authors[0] === author.node.id.split("_")[1] ?
                              <>
                                By <Link
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
                        ))}
                        {document.authors.slice(1, -1).map(currAuthor => (
                          <>
                          {data.allStrapiAuthors.edges.map(author => (
                            <>
                              {currAuthor === author.node.id.split("_")[1] ?
                                <>
                                  , <Link
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
                          ))}
                          </>
                        ))}
                        <span>, and </span>
                        {data.allStrapiAuthors.edges.map(author => (
                          <>
                            {document.authors[document.authors.length - 1] === author.node.id.split("_")[1] ?
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
                        ))}
                      </>
                    }
                  </p>
                  <p>
                    {handleDate(document.published_at)}
                  </p>
                </div>
              </div>
              {document.image ?
                <div className="flex-shrink-0">
                  <img src={document.image.publicURL} className="w-20 h-20 object-cover md:object-fit md:h-full md:w-48" alt="" />
                </div>
                :
                ""
              }
            </div>
          </li>
        ))}

      </ul>
      {hasMore ? (
        <button onClick={handleLoadMore} className="sans-serif block mx-auto px-4 py-2 text-white bg-black flex-shrink-0 cursor-pointer rounded">Load More</button>
      ) : (
        <p>No more results</p>
      )}
    </Layout>
  )
}

export default CategoryTemplate;

// export const query = graphql`
//   query CategoryTemplate($id: String!) {
//     strapiCategory(id: { eq: $id }) {
//       id
//       title
//       articles {
//         id
//         title
//         subtitle
//         authors
//         image {
//           publicURL
//         }
//         magazine
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

export const query = graphql`
  query CategoryTemplate($id: String!) {
    strapiCategory(id: { eq: $id }) {
      id
      title
      articles {
        id
        title
        authors
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