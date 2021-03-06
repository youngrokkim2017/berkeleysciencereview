import React from "react"
import { Link } from "gatsby"
// import ReactMarkdown from "react-markdown"
import "./css/styles.css"

const Preview = ({ article, format }) => {

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  if (format === "small") {
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-grow">
          <Link to={`/article/${article.published_at.split("-")[0]}/${article.published_at.split("-")[1]}/${article.published_at.split("-")[2].slice(0, 2)}/${article.title.split(/[^a-zA-Z0-9]/).filter(i => i).map((category) => category.toLowerCase()).join("-")}`}>
            <h2 className="text-base mb-2 md:text-2xl lg:text-lg">{article.title}</h2>
          </Link>
          {article.subtitle ?
            <h3 className="mb-4 text-sm">
              {article.subtitle}
            </h3>
            :
            ""
          }
          <p className='mb-1 text-sm'>
            {article.authors.length !== 0 ?
              <>
                {article.authors.length === 1 ?
                  <span key={article.authors[0].id}>
                    By <Link
                      to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                      className="font-medium"
                    >
                      {article.authors[0].name}
                    </Link>
                  </span>
                  : article.authors.length === 2 ?
                    <>
                      <span key={article.authors[0].id}>
                        By <Link
                          to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                          className="font-medium"
                        >
                          {article.authors[0].name}
                        </Link>
                      </span>
                      <span> and </span>
                      <span key={article.authors[article.authors.length - 1].id}>
                        <Link
                          to={`/author/${article.authors[article.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                          className="font-medium"
                        >
                          {article.authors[article.authors.length - 1].name}
                        </Link>
                      </span>
                    </>
                    : article.authors.length > 2 ?
                      <>
                        <span key={article.authors[0]}>
                          By <Link
                            to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                            className="font-medium"
                          >
                            {article.authors[0].name}
                          </Link>
                        </span>
                        {article.authors.slice(1, -1).map(author => (
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
                        <span key={article.authors[article.authors.length - 1].id}>
                          <Link
                            to={`/author/${article.authors[article.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                            className="font-medium"
                          >
                            {article.authors[article.authors.length - 1].name}
                          </Link>
                        </span>
                      </>
                      :
                      ""
                }
              </>
              :
              ""
            }
          </p>
        </div>
        {article.image ? <img src={article.image.publicURL} className="w-20 h-20 object-cover md:object-fit md:h-full md:w-48 lg:w-20 lg:h-20 lg:object-cover" alt="" /> : ""}
      </div>

    )
  } else if (format === "small-no-img") {
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-grow">
            <Link to={`/article/${article.published_at.split("-")[0]}/${article.published_at.split("-")[1]}/${article.published_at.split("-")[2].slice(0, 2)}/${article.title.split(/[^a-zA-Z0-9]/).filter(i => i).map((category) => category.toLowerCase()).join("-")}`}>
              <h2 className="font-medium text-base mb-2 md:text-2xl lg:text-lg">{article.title}</h2>
            </Link>
          {article.subtitle ?
            <h3 className="mb-4 text-sm">
              {article.subtitle}
            </h3>
            :
            ""
          }
          <p className='mb-1 text-sm'>
            {article.authors.length !== 0 ?
              <>
                {article.authors.length === 1 ?
                  <span key={article.authors[0].id}>
                    By <Link
                      to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                      className="font-medium"
                    >
                      {article.authors[0].name}
                    </Link>
                  </span>
                  : article.authors.length === 2 ?
                    <>
                      <span key={article.authors[0].id}>
                        By <Link
                          to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                          className="font-medium"
                        >
                          {article.authors[0].name}
                        </Link>
                      </span>
                      <span> and </span>
                      <span key={article.authors[article.authors.length - 1].id}>
                        <Link
                          to={`/author/${article.authors[article.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                          className="font-medium"
                        >
                          {article.authors[article.authors.length - 1].name}
                        </Link>
                      </span>
                    </>
                    : article.authors.length > 2 ?
                      <>
                        <span key={article.authors[0]}>
                          By <Link
                            to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                            className="font-medium"
                          >
                            {article.authors[0].name}
                          </Link>
                        </span>
                        {article.authors.slice(1, -1).map(author => (
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
                        <span key={article.authors[article.authors.length - 1].id}>
                          <Link
                            to={`/author/${article.authors[article.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                            className="font-medium"
                          >
                            {article.authors[article.authors.length - 1].name}
                          </Link>
                        </span>
                      </>
                      :
                      ""
                }
              </>
              :
              ""
            }
          </p>
        </div>
      </div>

    )
  } else if (format === "medium") {
    return (
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
          <div className="text-sm md:text-base lg:text-sm">
            <p className='mb-2'>
              {article.authors.length !== 0 ?
                <>
                  {article.authors.length === 1 ?
                    <span key={article.authors[0].id}>
                      By <Link
                        to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                        className="font-medium"
                      >
                        {article.authors[0].name}
                      </Link>
                    </span>
                    : article.authors.length === 2 ?
                      <>
                        <span key={article.authors[0].id}>
                          By <Link
                            to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                            className="font-medium"
                          >
                            {article.authors[0].name}
                          </Link>
                        </span>
                        <span> and </span>
                        <span key={article.authors[article.authors.length - 1].id}>
                          <Link
                            to={`/author/${article.authors[article.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                            className="font-medium"
                          >
                            {article.authors[article.authors.length - 1].name}
                          </Link>
                        </span>
                      </>
                      : article.authors.length > 2 ?
                        <>
                          <span key={article.authors[0]}>
                            By <Link
                              to={`/author/${article.authors[0].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                              className="font-medium"
                            >
                              {article.authors[0].name}
                            </Link>
                          </span>
                          {article.authors.slice(1, -1).map(author => (
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
                          <span key={article.authors[article.authors.length - 1].id}>
                            <Link
                              to={`/author/${article.authors[article.authors.length - 1].name.split(/[^a-zA-Z0-9]/).filter(i => i).map((a) => a.toLowerCase()).join("-")}`}
                              className="font-medium"
                            >
                              {article.authors[article.authors.length - 1].name}
                            </Link>
                          </span>
                        </>
                        :
                        ""
                  }
                </>
                :
                ""
              }
            </p>
            <p>
              {handleDate(article.published_at)}
            </p>
          </div>
        </div>
        {article.image
          ?
          <div className="flex-shrink-0">
            <img src={article.image.publicURL} className="w-20 h-20 object-cover md:object-fit md:h-full md:w-48" alt="" />
          </div>
          :
          ""
        }
      </div>

    )
  }
}

export default Preview

