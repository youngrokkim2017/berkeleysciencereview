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
      <h2 className="font-normal mb-12 pb-8 text-4xl border-b border-black">{data.strapiAuthors.name}</h2>
      <ul className="mb-12">
        {data.strapiAuthors.articles.map(article => (
            <li key={article.id} className="mt-6 pb-6 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
              <div className="flex items-start">
                <div className="mr-6 flex-grow">

                  <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                    <h2 className="font-medium mb-2 text-2xl">{article.title}</h2>
                  </Link>
                  <p>
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