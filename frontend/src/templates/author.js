// import React from 'react'
import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const AuthorTemplate = ({ data }) => {

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  const sortedByDate = data.strapiAuthors.articles.sort((a, b) => {
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
      <h2 className="font-normal mb-12 pb-8 text-4xl border-b border-black">{data.strapiAuthors.name}</h2>
      <ul className="mb-12">
        {/* {data.strapiAuthors.articles.map(article => ( */}
        {list.map(article => (
            <li key={article.id} className="mt-6 pb-6 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
              <div className="flex items-start">
                <div className="mr-6 flex-grow">
                  {article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")[article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").length - 1] === "-" ?
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").slice(0, -1)}`}>
                      <h2 className="text-base mb-2 text-2xl">{article.title}</h2>
                    </Link>
                  :
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                      <h2 className="text-base mb-2 text-2xl">{article.title}</h2>
                    </Link>
                  }
                  <p className="text-sm md:text-base lg:text-sm">
                    {handleDate(article.published_at)}
                  </p>
                </div>
                {article.image ?
                  <div className="flex-shrink-0">
                    <img src={article.image.publicURL} className="w-20 h-20 object-cover md:object-fit md:h-full md:w-48" alt="" />
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

export default AuthorTemplate;

export const query = graphql`
  query AuthorTemplate($id: String!) {
    strapiAuthors(id: { eq: $id }) {
      id
      name
      articles {
        id
        title
        published_at
        image {
          publicURL
        }
      }
    }
  }
`