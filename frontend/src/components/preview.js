import React from "react"
import { Link } from "gatsby"
// import ReactMarkdown from "react-markdown"

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
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}>
                        <h2 className="text-base mb-2 md:text-2xl lg:text-lg">{article.title}</h2>                        
                    </Link>
                    <h3 className="mb-4 text-sm">This is a placeholder subtitle. A preview of the article content goes here.</h3>
                    <p className='mb-1 text-sm'>
                        {/* {article.author ?
                            <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium">
                                {article.author.name}
                            </Link>
                            :
                            ""
                        } */}
                        {article.authors ?
                            <>
                                {article.authors.map(author => (
                                    <>
                                        <Link to={`/author/${author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium">
                                            {author.name}
                                        </Link>
                                    </>
                                ))}
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
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}>
                        <h2 className="font-medium text-base mb-2 md:text-2xl lg:text-lg">{article.title}</h2>
                    </Link>
                    <h3 className="mb-4 text-sm">This is a placeholder subtitle. A preview of the article content goes here.</h3>
                    <p className='mb-1 text-sm'>
                        {/* {article.author ?
                            <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium">
                                {article.author.name}
                            </Link>
                            :
                            ""
                        } */}
                        {article.authors ?
                            <>
                                {article.authors.map(author => (
                                    <>
                                        <Link to={`/author/${author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium">
                                            {author.name}
                                        </Link>
                                    </>
                                ))}
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
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                        <h2 className="text-base mb-2 md:text-3xl">{article.title}</h2>
                    </Link>
                    <h3 className="mb-4 text-sm">This is a placeholder subtitle. A preview of the article content goes here.</h3>
                    <div className="text-sm md:text-base lg:text-sm">
                        <p className='mb-2'>
                            {/* {article.author ?
                                <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium">
                                    {article.author.name}
                                </Link>
                                :
                                ""
                            } */}
                            {article.authors ?
                            <>
                                {article.authors.map(author => (
                                    <>
                                        <Link to={`/author/${author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium">
                                            {author.name}
                                        </Link>
                                    </>
                                ))}
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

