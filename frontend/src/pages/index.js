import React from "react"
import { Link, graphql } from "gatsby"

import Preview from "../components/preview"

import Header from "../components/header"
import Footer from "../components/footer"

import MailchimpComponentHome from '../components/mailchimpHome'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  // fade: true,
  // adaptiveHeight: true,
};

const IndexPage = ({ data }) => {

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  // const sortedByDate = this.props.data.allStrapiArticle.edges.sort((a, b) => {
  const sortedByDate = data.allStrapiArticle.edges.sort((a, b) => {
    let aDate = parseInt(a.node.published_at.split("T")[0].split("-").join(""))
    let bDate = parseInt(b.node.published_at.split("T")[0].split("-").join(""))
    return (bDate - aDate)
  });

  const recentArticles = sortedByDate.slice(0, 5);

  const labscopesArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Labscopes')
  )).slice(0, 3);

  const noteworthyArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Noteworthy News')
  )).slice(0, 3);

  const climateChangeArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Climate Change')
  )).slice(0, 3);

  const lifeScienceArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Life Science')
  )).slice(0, 3);

  const popularArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title).includes('Noteworthy News')
  )).slice(0, 6);

  const latestIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue)[0];

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={data} />
      <main className='container mx-auto px-4 md:px-8 xl:px-0'>
        <div className="mb-16 mx-auto">
          <div>
            <Slider {...settings}>
              {recentArticles.map(document => (
                <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`} key={document.node.title}>
                  <div className="text-center">
                    {document.node.image
                      ?
                      <div className="">
                        <img src={document.node.image.publicURL} alt="" className="m-0 p-0 text-center mx-auto mb-6 object-cover h-48 sm:w-3xl sm:h-96" />
                      </div>
                      :
                      ""
                    }
                    <h2 className="text-4xl mb-2">{document.node.title}</h2>
                    <p>
                      {document.node.author.name}
                    </p>
                    <p>
                      {handleDate(document.node.published_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 xl:gap-x-12 gap-y-12 mb-6 sm:mb-12">
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Popular
          </h1>
            <ul>
              {popularArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small" />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Latest
          </h1>
            <ul>
              {recentArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="medium" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div>
                <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
                  Newsletter
              </h1>
                <MailchimpComponentHome />
              </div>
              <div>
                <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
                  Magazine
              </h1>
                <Link to={`/magazine/${latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                  {/* <Document
                  file={latestIssue.node.pdf.publicURL}
                >
                  <Page pageNumber={1} />
                </Document> */}
                  <img src={latestIssue.node.thumbnail.publicURL} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-12 gap-y-6 -mb-6 sm:mb-0">
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Labscopes
          </h1>
            <ul>
              {labscopesArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Noteworthy News
          </h1>
            <ul>
              {noteworthyArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Climate Change
          </h1>
            <ul>
              {climateChangeArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-3xl font-medium pb-4 mb-4 border-b border-black leading-none'>
              Life Science
          </h1>
            <ul>
              {lifeScienceArticles.map(document => (
                <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                  <Preview article={document.node} format="small-no-img" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default IndexPage;

// gql query
export const splashQuery = graphql`
  query SplashQuery {
    allStrapiArticle(
      sort: { order: DESC, fields: published_at }
    ) {
      edges {
        node {
          id
          title
          author {
            name
          }
          image {
            publicURL
          }
          categories {
            id
            title
          }
          published_at
          updatedAt
        }
      }
    }
    allStrapiMagazineIssue {
      edges {
        node {
          id
          issue
          title
          thumbnail {
            publicURL
          }
        }
      }
    }
  }
`