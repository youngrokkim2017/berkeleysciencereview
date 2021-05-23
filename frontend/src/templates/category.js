import React, { useState, useEffect } from 'react'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const CategoryTemplate = ({ data }) => {
  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  // const sortedByDate = data.allStrapiArticle;

  // const [list, setList] = useState([...sortedByDate.slice(0, 10)])
  // // State to trigger load more
  // const [loadMore, setLoadMore] = useState(false)
  // // State of whether there is more to load
  // const [hasMore, setHasMore] = useState(sortedByDate.length > 10)
  // // Load more button click
  // const handleLoadMore = () => {
  //   setLoadMore(true)
  // }
  // // Handle loading more articles
  // useEffect(() => {
  //   if (loadMore && hasMore) {
  //     const currentLength = list.length
  //     const isMore = currentLength < sortedByDate.length
  //     const nextResults = isMore
  //       ? sortedByDate.slice(currentLength, currentLength + 10)
  //       : []
  //     setList([...list, ...nextResults])
  //     setLoadMore(false)
  //   }
  // }, [loadMore, hasMore]) //eslint-disable-line
  // //Check if there is more
  // useEffect(() => {
  //   const isMore = list.length < sortedByDate.length
  //   setHasMore(isMore)
  // }, [list]) //eslint-disable-line

  return (
    <Layout>
      <h2 className="font-normal mb-8 pb-2 text-4xl border-b border-black">{data.strapiCategory.title}</h2>
      <ul className="mb-12">
        {console.log(data.strapiCategory.id)}
        {data.allStrapiArticle.edges.map(document => (
          <li key={document.node.id} className="mt-6 pb-6 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
            <div className="flex items-start">
              <div className="mr-6 flex-grow">
                <Link to={`/article/${document.node.title.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}>
                  <h2 className="text-base mb-2 md:text-2xl">{document.node.title}</h2>
                </Link>
                {document.node.subtitle ?
                  <h3 className="mb-4 text-sm">
                    {document.node.subtitle}
                  </h3>
                  :
                  ""
                }
                <div className="text-sm md:text-base lg:text-sm">
                  <p className='mb-2'>
                    {/* {document.node.authors.length === 1 ?
                      <>
                        {document.node.authors.map(currAuthor => (
                          data.allStrapiAuthors.edges.map(author => (
                            <div>
                              {currAuthor === author.node.id.split("_")[1] ?
                                <>
                                  By <Link
                                    className="font-medium"
                                    to={`/author/${author.node.name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
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
                      : document.node.authors.length === 2 ?
                        <>
                          {data.allStrapiAuthors.edges.map(author => (
                            <>
                              {document.node.authors[0] === author.node.id.split("_")[1] ?
                                <>
                                  By <Link
                                    className="font-medium"
                                    to={`/author/${author.node.name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
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
                              {document.node.authors[document.node.authors.length - 1] === author.node.id.split("_")[1] ?
                                <>
                                  <Link
                                    className="font-medium"
                                    to={`/author/${author.node.name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
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
                        : document.node.authors.length > 2 ?
                          <>
                            {data.allStrapiAuthors.edges.map(author => (
                              <>
                                {document.node.authors[0] === author.node.id.split("_")[1] ?
                                  <>
                                    By <Link
                                      className="font-medium"
                                      to={`/author/${author.node.name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                                    >
                                      {author.node.name}
                                    </Link>
                                  </>
                                  :
                                  ""
                                }
                              </>
                            ))}
                            {document.node.authors.slice(1, -1).map(currAuthor => (
                              <>
                                {data.allStrapiAuthors.edges.map(author => (
                                  <>
                                    {currAuthor === author.node.id.split("_")[1] ?
                                      <>
                                        , <Link
                                          className="font-medium"
                                          to={`/author/${author.node.name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
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
                                {document.node.authors[document.node.authors.length - 1] === author.node.id.split("_")[1] ?
                                  <>
                                    <Link
                                      className="font-medium"
                                      to={`/author/${author.node.name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
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
                          ""
                    } */}
                  </p>
                  <p>
                    {handleDate(document.node.published_at)}
                  </p>
                </div>
              </div>
              {document.node.image ?
                <div className="flex-shrink-0">
                  <img src={document.node.image.publicURL} className="w-20 h-20 object-cover md:object-fit md:h-full md:w-48" alt="" />
                </div>
                :
                ""
              }
            </div>
          </li>
        ))}

      </ul>
      {/* {hasMore ? (
        <button onClick={handleLoadMore} className="sans-serif block mx-auto px-4 py-2 text-white bg-black flex-shrink-0 cursor-pointer rounded">Load More</button>
      ) : (
        <p className="sans-serif">No more results</p>
      )} */}
    </Layout>
  )
}

export default CategoryTemplate;

export const query = graphql`
query CategoryTemplate($id: String!) {
  strapiCategory(strapiId: { eq: $id }) {
    id
    title
  }
  allStrapiArticle(
    filter: {categories: {elemMatch: {id: {eq: $id}}}}
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