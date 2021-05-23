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

      <div className="mb-8">
        <h2 className="font-normal mb-8 pb-2 text-4xl border-b border-black">{data.strapiAuthors.name}</h2>
        <div className="flex flex-row mb-4 space-x-4 align-items-center sans-serif">
          {data.strapiAuthors.instagram ?
            <Link to={data.strapiAuthors.instagram} className="flex items-center space-x-2 no-underline">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" className=""></path>
              </svg>
              <span>Instagram</span>
            </Link>
            :
            ""
          }
          {data.strapiAuthors.twitter ?
            <Link to={data.strapiAuthors.twitter} className="flex items-center space-x-2 no-underline">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
              <span>Twitter</span>
            </Link>
            :
            ""
          }
        </div>
      </div>
      <ul className="mb-12">
        {list.map(article => (
          <li key={article.id} className="mt-6 pb-6 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
            <div className="flex items-start">
              <div className="mr-6 flex-grow">
                <Link to={`/article/${article.published_at.split("-")[0]}/${article.published_at.split("-")[1]}/${article.published_at.split("-")[2].slice(0, 2)}/${article.title.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}>
                  <h2 className="text-base mb-2 md:text-2xl">{article.title}</h2>
                </Link>
                {article.subtitle ?
                  <h3 className="mb-4 text-sm">
                    {article.subtitle}
                  </h3>
                  :
                  ""
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
        ""
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
      twitter
      instagram
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