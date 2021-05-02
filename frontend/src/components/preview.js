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
                        <h2 className="font-normal text-base mb-2 md:text-2xl lg:text-base">{article.title}</h2>
                    </Link>
                    <p className='mb-1 text-sm md:text-base lg:text-sm leading-none lg:leading-none'>
                        {article.author ?
                            <>By <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="underline">
                                {article.author.name}
                            </Link></>
                            :
                            ""
                        }
                    </p>
                    {/* <p className="text-sm">
                        {handleDate(article.published_at)}
                    </p> */}
                </div>
                {article.image ? <img src={article.image.publicURL} className="w-20 h-20 object-cover md:object-fit md:h-full md:w-48 lg:w-20 lg:h-20 lg:object-cover" alt="" /> : ""}
            </div>

        )
    } else if (format === "small-no-img") {
        return (
            <div className="flex items-start space-x-4">
                <div className="flex-grow">
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}>
                        <h2 className="font-normal text-base mb-2 md:text-2xl lg:text-base">{article.title}</h2>
                    </Link>
                    <p className='text-sm md:text-base lg:text-sm leading-none lg:leading-none'>
                        {article.author ?
                            <>By <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="underline">
                                {article.author.name}
                            </Link></>
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
                        <h2 className="font-normal text-base mb-2 md:text-xl">{article.title}</h2>
                    </Link>
                    <div className="text-sm md:text-base lg:text-sm leading-none lg:leading-none">
                        <p className='mb-2'>
                            {article.author ?
                                <>By <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="underline">
                                    {article.author.name}
                                </Link></>
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
    } else if (format === "large") {
        return (
            <>
                <div>
                    <h4>{article.title}</h4>
                    {article.image
                        ?
                        <div className="">
                            <img src={article.image.publicURL} alt="" />
                        </div>
                        :
                        ""
                    }
                </div>
            </>

        )
    }
}

// this.props.article.title
// this.props.article.author.name
// this.props.article.image

export default Preview

