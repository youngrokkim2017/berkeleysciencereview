import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
// import Preview from "../components/preview"

const MagazineIssueTemplate = ({ data }) => {
  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }
  
  return (
  <Layout>
    <div className="mx-auto">
      <h2 className="font-normal mb-12 pb-8 text-4xl leading-tight border-b border-black">{data.strapiMagazineIssue.title}</h2>
        <ul className="mb-12">
          {data.strapiMagazineIssue.articles.map(document => (
            <li key={document.id} className="mt-8 pb-8 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
              <div className="flex items-start">

                <div className="mr-6 flex-grow">
                  <Link to={`/article/${document.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                    <h2 className="font-medium mb-2 text-2xl leading-none">{document.title}</h2>
                  </Link>
                  <p className='my-2'>
                    {handleDate(document.published_at)}
                  </p>
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
                {document.image ?
                  <div>
                    <img src={document.image.publicURL} style={{ maxWidth: '200px' }} alt="" />
                  </div>
                  :
                  ""
                }
              </div>
            </li>
          ))}
        </ul>
    </div>
  </Layout>
  )
}

export default MagazineIssueTemplate;

export const query = graphql`
  query MagazineIssueTemplate($id: String!) {
    strapiMagazineIssue(id: { eq: $id }) {
      id
      title
      issue
      articles {
        id
        title
        author
        content
        image {
          publicURL
        }
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