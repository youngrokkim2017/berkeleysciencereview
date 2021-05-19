import React from 'react'
import { Link } from "gatsby"

const SearchIndexItems = ({ searchData, searchQuery }) => {
  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }
  
    return (
        <div className="container mx-auto">
            <ul>
              {searchData.map(document => (
                <li key={document.node.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: '#ECECF3' }}>
                  <div className="flex items-start">
                    <div className="mr-6 flex-grow">
                      {/* <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
                        <h2 className="font-medium mb-2 text-2xl">
                          {document.node.title}
                        </h2>
                      </Link> */}
                      {document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")[document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-").length - 1] === "-" ?
                        <div>
                          <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-").slice(0, -1)}`} style={{ textDecoration: `none` }}>
                            <h2 className="font-medium mb-2 text-2xl">
                              {document.node.title}
                            </h2>
                          </Link>
                        </div>
                      :
                        <div>
                          <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
                            <h2 className="font-medium mb-2 text-2xl">
                              {document.node.title}
                            </h2>
                          </Link>
                        </div>
                      }
                      <p className='mb-2 text-base'>
                        {/* By <Link to={`/author/${document.node.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                          {document.node.author.name}
                        </Link> */}
                    {/* {document.node.authors.map(author => (
                      <span key={author.id}>
                        By <Link
                          // key={author.id}
                          to={`/author/${author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}
                          className="font-medium underline"
                        >
                          {author.name}
                        </Link>
                      </span>
                    ))} */}
                  </p>
                  <p className='my-2'>
                    {handleDate(document.node.published_at)}
                  </p>
                </div>
              </div>
              {document.node.image ?
                <div>
                  <img src={document.node.image.publicURL} style={{ maxWidth: '210px' }} alt="" />
                </div>
                :
                ""
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchIndexItems;