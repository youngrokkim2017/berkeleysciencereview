import React from "react"
import { Link, graphql } from "gatsby"
// import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import Preview from "../components/preview"
import Header from "../components/header"
import Footer from "../components/footer"

class ArticleTemplate extends React.Component {
  componentDidMount() {
    var sidebar = document.getElementById("sidebar");
    var element = document.getElementById('metadata');
    var bottomPos = element.getBoundingClientRect().bottom + window.scrollY;

    function myScrollFunc() {
      var y = window.scrollY;
      if (y >= bottomPos) {
        sidebar.classList.remove("opacity-0");
        sidebar.classList.add("opacity-1");
        sidebar.classList.add("transition", "duration-500", "ease-in-out");
      } else {
        sidebar.classList.add("opacity-0");
        sidebar.classList.remove("opacity-1");
        sidebar.classList.remove("transition", "duration-500", "ease-in-out");
      }
    }
    window.addEventListener("scroll", myScrollFunc);

    // function clipboard() {
    //   const clip = document.querySelector('.clipboard');
    //   navigator.clipboard.writeText(window.location.href);
    //   clip.classList.add('text-green-400');
    // }
  }

  render() {
    const { data } = this.props;
    function handleDate(e) {
      var d = new Date(e);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return d.toLocaleDateString(undefined, options)
    }

    // const sortedByDate = data.recent.edges.sort((a, b) => {
    //   let aDate = parseInt(a.node.published_at.split("T")[0].split("-").join(""))
    //   let bDate = parseInt(b.node.published_at.split("T")[0].split("-").join(""))
    //   return (bDate - aDate)
    // })

    const recentArticlesSidebar = data.recent.edges.filter(document => (
      document.node.id !== this.props.data.strapiArticle.id
    )).slice(0, 3)

    let relatedArticles = data.related.edges.filter(document => (
      document.node.id !== this.props.data.strapiArticle.id
    )).slice(0, 3);

    // let relatedArticles = sortedByDate.filter(document => (
    //   document.node.categories.length !== 0 && this.props.data.strapiArticle.categories.map(a => a.title)[0] === document.node.categories.map(b => b.title)[0] && document.node.id !== this.props.data.strapiArticle.id
    // )).slice(0, 10);

    // const temp = [];
    // while (relatedArticles.length !== 0) {
    //   let randomIndex = Math.floor(Math.random() * relatedArticles.length);
    //   temp.push(relatedArticles[randomIndex]);
    //   relatedArticles.splice(randomIndex, 1);
    // }

    // relatedArticles = temp.slice(0, 3);

    return (
      <div key={data.strapiArticle.id} className="flex flex-col min-h-screen justify-between">
        <Header data={data} />
        {/* <div className="justify-between overflow-visible relative items-start px-4 lg:px-2 xl:px-0 mx-auto" style={{ maxWidth: '1036px' }}> */}
        <div className='container mx-auto px-4 md:px-8 lg:px-4' style={{ maxWidth: '1036px' }}>
          <div className='fixed top-0 mt-40 opacity-0 -ml-40 hidden w-36' id="sidebar">
            <div className="leading-5">
              {/* {data.strapiArticle.author ?
                <p className='text-sm'>
                  By <Link to={`/author/${data.strapiArticle.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                    {data.strapiArticle.author.name}
                  </Link>
                </p>
                :
                ""
              } */}
              {data.strapiArticle.authors ?
                <p className='text-sm'>
                  {data.strapiArticle.authors.map(author => (
                    <span key={author.id}>
                      By <Link 
                        // key={author.id}
                        to={`/author/${author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} 
                        className="font-medium underline"
                      >
                        {author.name}
                      </Link>
                    </span>
                  ))}
                </p>
                :
                ""
              }
            </div>
          </div>

          <div className="w-full">
            <div className="antialiased mx-auto text-black mb-12">
              <div className="border-b border-black pb-8 mb-8">
                <p className='my-0 tracking-tight text-xl sans-serif items-center'>
                  <span>
                    {data.strapiArticle.categories[0] ?
                      <Link to={`/category/${data.strapiArticle.categories[0].title.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="text-black no-underline">
                        {data.strapiArticle.categories[0].title}
                      </Link>
                      :
                      ""
                    }
                    {data.strapiArticle.categories[1] ?
                      <><span className="mx-1">and</span>
                        <Link to={`/category/${data.strapiArticle.categories[1].title.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="text-black no-underline">
                          {data.strapiArticle.categories[1].title}
                        </Link>
                      </>
                      :
                      ""
                    }
                  </span>
                </p>
                <h2 className="my-2 text-4xl">{data.strapiArticle.title}</h2>
                <h3 className="mb-4 text-lg">This is a placeholder subtitle. A preview of the article content goes here.</h3>
                <div className="text-base" id="metadata">
                  {/* {data.strapiArticle.author ?
                    <p className='mb-1 text-base'>
                      <Link to={`/author/${data.strapiArticle.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium">
                        {data.strapiArticle.author.name}
                      </Link>
                    </p>
                    :
                    ""
                  } */}
                  {data.strapiArticle.authors ?
                    <p className='mb-1 text-base'>
                      {data.strapiArticle.authors.map(author => (
                        <span key={author.id}>
                          By <Link 
                            // key={author.id}
                            to={`/author/${author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} 
                            className="font-medium"
                          >
                            {author.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                    :
                    ""
                  }
                  <p className='my-0'>
                    {handleDate(data.strapiArticle.published_at)}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap">
                <div className="flex-shrink-0 prose tracking-normal text-black max-w-prose lg:max-w-2xl w-full mr-8">
                  <div>
                    {data.strapiArticle.image ?
                      <img src={data.strapiArticle.image.publicURL} className="featured-img-container mb-8 mt-0 w-full" alt="" />
                      :
                      ""
                    }
                  </div>
                  <ReactMarkdown
                    source={data.strapiArticle.content}
                    transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                  />
                  <div className='mt-12'>
                    <div className="inline-flex items-center space-x-8">
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${this.props.location.href}&t=${data.strapiArticle.title}`} className="flex items-center space-x-2 no-underline">
                        {/* <a href={`https://www.facebook.com/sharer/sharer.php`} className="flex items-center space-x-2 no-underline"> */}
                        <svg width="20" height="20" viewBox="0 0 16 16">
                          <path d="M15.117 0H.883A.883.883 0 0 0 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.461V7.389h2.085V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.065 1.863.095v2.16h-1.279c-1.002 0-1.196.476-1.196 1.176v1.541h2.39l-.31 2.415h-2.08V16h4.077a.883.883 0 0 0 .883-.883V.883A.883.883 0 0 0 15.117 0"></path>
                        </svg>
                      </a>
                      <a href={`https://twitter.com/intent/tweet?url=${this.props.location.href}&text=${data.strapiArticle.title}`} className="flex items-center space-x-2 no-underline">
                        {/* <a href={`https://twitter.com/intent/tweet`} className="flex items-center space-x-2 no-underline"> */}
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                      <a href={`mailto:?subject=${data.strapiArticle.title}&body=${this.props.location.href}`} className="flex items-center space-x-2 no-underline">
                        {/* <a href={`mailto:?subject=${data.strapiArticle.title}`} className="flex items-center space-x-2 no-underline"> */}
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </a>
                      {/* <button onClick={clipboard} className="clipboard flex items-center space-x-2 no-underline cursor-pointer active:text-green-400 transition duration-200 ease-in-out">
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </button> */}
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  {data.strapiArticle.categories.length === 0 ?
                    <div className="mt-12 lg:mt-0">
                      <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black'>
                        Recent Articles
                      </h2>
                      <ul>
                        {recentArticlesSidebar.map(document => (
                          <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                            <Preview article={document.node} format="small" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    :
                    <div className="mt-12 lg:mt-0">
                      <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black'>
                        Related Articles
                      </h2>
                      <ul>
                        {relatedArticles.map(document => (
                          <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                            <Preview article={document.node} format="small" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                </div>
              </div>

            </div>
          </div>
          <div className='mt-12 mx-auto'>
            <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black'>
              Most Popular
          </h2>
            {/* GOOGLE ANALYTICS gatsby-plugin-google-analytics */}
            {/* https://hippocampus-garden.com/trend/ */}
          </div>
        </div>
        <Link to={`https://docs.google.com/forms/d/e/1FAIpQLSdMCiDUSUOxaK6tPFR0jimZnEX0gvVPwPcJ6V9PvSQzTryvmw/viewform?usp=pp_url&entry.299816419=${this.props.location.href}`} id="report" className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-3 text-white rounded-full space-x-4 sans-serif">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block align-middle" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="inline-block align-middle">
            <p className="m-0 p-0 text-lg font-extrabold">Notice something wrong?</p>
            <p>Please report it here.</p>
          </span>
        </Link>
        <Footer />
      </div>
    )
  }
}


export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!, $categoryList: [String!]) {
    strapiArticle(id: {eq: $id }) {
      id
      title
      published_at
      content
      image {
        publicURL
      }
      authors {
        id
        name
      }
      categories {
        id
        title
      }
  }
  recent: allStrapiArticle(
    sort: {order: DESC, fields: published_at}
    limit: 4
  ) {
    edges {
      node {
        id
        title
        authors {
          id
          name
        }
        categories {
          id
          title
        }
        image {
          publicURL
        }
        published_at
      }
    }
  }
  related: allStrapiArticle(
    sort: {order: DESC, fields: published_at}
    limit: 4
    filter: {
      categories: {
        elemMatch: {
          id: {
            in: $categoryList
          }
        }
      }
    }
  ) {
    edges {
      node {
        id
        title
        authors {
          id
          name
        }
        categories {
          id
          title
        }
        image {
          publicURL
        }
        published_at
      }
    }
  }
  allStrapiMagazineIssue(
    sort: {order: DESC, fields: issue}
  ) {
        edges {
          node {
            id
            title
            pdf {
              publicURL
            }
          }
        }
      }
}
`