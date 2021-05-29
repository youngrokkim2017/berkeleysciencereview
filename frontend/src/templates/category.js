import React, { useState, useEffect } from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Preview from "../components/preview"
import Seo from "../components/seo"

const CategoryTemplate = ({ data }) => {

  const sortedByDate = data.allStrapiArticle.edges;

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
      <Seo
        title={data.strapiCategory.title}
      />
      <h2 className="font-normal pb-2 text-4xl border-b border-black">{data.strapiCategory.title}</h2>
      <ul className="mb-12">
        {list.map(article => (
          <li key={article.node.id} className="py-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
            <Preview article={article.node} format="medium" />
          </li>
        ))}
      </ul >
      {hasMore ? (
        <button onClick={handleLoadMore} className="sans-serif block mx-auto px-4 py-2 text-white bg-black flex-shrink-0 cursor-pointer rounded">Load More</button>
      ) : (
        <p className="sans-serif">No more results</p>
      )}
    </Layout >
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
        image {
          publicURL
        }
        categories {
          id
          title
        }
        published_at
      }
    }
  }
}
`