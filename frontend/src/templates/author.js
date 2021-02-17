import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import ReactMarkdown from "react-markdown"

const AuthorTemplate = ({ data }) => (
    <Layout>
      <h1>{data.strapiAuthors.name}</h1>
      <ul>
        {data.strapiAuthors.articles.map(article => (
          <li key={article.id}>
            <h2>
              <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>{article.title}</Link>
            </h2>
            <ReactMarkdown
              source={`${article.content.slice(0, 300)}...`}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              className="mb-4"
            />
          </li>
        ))}
      </ul>
    </Layout>
  )
  
export default AuthorTemplate;

export const query = graphql`
  query AuthorTemplate($id: String!) {
    strapiAuthors(id: { eq: $id }) {
      id
      name
      articles {
        id
        title
        content
      }
    }
  }
`