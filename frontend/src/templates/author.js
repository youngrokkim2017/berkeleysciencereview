import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const AuthorTemplate = ({ data }) => {

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  return (
    <Layout>
        <h2 className="font-normal mb-12 pb-8 text-4xl leading-tight border-b border-black">{data.strapiAuthors.name}</h2>
        <ul className="mb-12">
          {data.strapiAuthors.articles.map(article => (
            <li key={article.id} className="mt-8 pb-8 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
              <div className="flex items-start">
                {article.image ?
                  <div className="mr-6">
                    <img src={article.image.publicURL} style={{ maxWidth: '200px' }} alt="" />
                  </div>
                  :
                  ""
                }
                <div>
                  <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                    <h2 className="font-medium mb-2 text-3xl leading-none">{article.title}</h2>
                  </Link>
                  <p className='my-0'>
                    {handleDate(article.published_at)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
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