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
                <Link to={`/article/${document.node.published_at.split("-")[0]}/${document.node.published_at.split("-")[1]}/${document.node.published_at.split("-")[2].slice(0, 2)}/${document.node.title.split(/[^a-zA-Z0-9]/).filter(i => i).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
                  <h2 className="text-base mb-2 md:text-2xl">
                    {document.node.title}
                  </h2>
                </Link>
                {document.node.subtitle ?
                  <h3 className="mb-4 text-sm">
                    {document.subtitle}
                  </h3>
                  :
                  ""
                }
                <div className="text-sm md:text-base lg:text-sm">
                  <p className='mb-2'>
                    {document.node.authors.length === 1 ?

                      <span key={document.node.authors[0].id}>
                        By <Link
                          to={`/author/${document.node.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                          className="font-medium"
                        >
                          {document.node.authors[0].name}
                        </Link>
                      </span>

                      : document.node.authors.length === 2 ?

                        <>
                          <span key={document.node.authors[0].id}>
                            By <Link
                              to={`/author/${document.node.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                              className="font-medium"
                            >
                              {document.node.authors[0].name}
                            </Link>
                          </span>
                          <span> and </span>
                          <span key={document.node.authors[document.node.authors.length - 1].id}>
                            <Link
                              to={`/author/${document.node.authors[document.node.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                              className="font-medium"
                            >
                              {document.node.authors[document.node.authors.length - 1].name}
                            </Link>
                          </span>
                        </>

                        : document.node.authors.length > 2 ?

                          <>
                            <span key={document.node.authors[0]}>
                              By <Link
                                to={`/author/${document.node.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                                className="font-medium"
                              >
                                {document.node.authors[0].name}
                              </Link>
                            </span>
                            {document.node.authors.slice(1, -1).map(author => (
                              <span key={author.id}>
                                , <Link
                                  to={`/author/${author.name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                                  className="font-medium"
                                >
                                  {author.name}
                                </Link>
                              </span>
                            ))}
                            <span>, and </span>
                            <span key={document.node.authors[document.node.authors.length - 1].id}>
                              <Link
                                to={`/author/${document.node.authors[document.node.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                                className="font-medium"
                              >
                                {document.node.authors[document.node.authors.length - 1].name}
                              </Link>
                            </span>
                          </>
                          :
                          ""
                    }
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
    </div>
  )
}

export default SearchIndexItems;