import React, { useState } from "react"
// import React, { useState, lazy, Suspense } from "react"
// import React, { useState, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
// import Img from 'gatsby-image';
import ReactMarkdown from "react-markdown"
import Fuse from "fuse.js"  // fuzzy search
import Highlight from 'react-highlighter'
// import MailchimpComponent from '../components/mailchimp'
import SearchHeader from '../components/searchHeader'
import Footer from '../components/footer';

const SearchPage = ({ location }) => {
  // const data = useStaticQuery(graphql`
  //   query SearchResultsQuery {
  //     allStrapiArticle(
  //       sort: { fields: [created_at], order: DESC }
  //     ) {
  //       edges {
  //         node {
  //           id
  //           image {
  //             publicURL
  //           }
  //           title
  //           author {
  //             id
  //             name
  //           }
  //           content
  //           categories {
  //             id
  //             title
  //           }
  //           published_at
  //           updated_at
  //         }
  //       }
  //     }
  //     allStrapiCategory {
  //       edges {
  //         node {
  //           id
  //           title
  //         }
  //       }
  //     }
  //   }
  // `)

  const data = useStaticQuery(graphql`
    query SearchResultsQuery {
      allStrapiArticle(
        sort: { fields: [createdAt], order: DESC }
      ) {
        edges {
          node {
            id
            title
            author {
              id
              name
            }
            content
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
      allStrapiCategory {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)

  const [query, setQuery] = useState('');
  // const [query, setQuery] = useState(location.state.searchQuery);
  // const [input, setInput] = useState('');

  // const unsortedData = data.allStrapiArticle.edges;
  // const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  // const sortedData = data.allStrapiArticle.edges.sort((a, b) => b.id - a.id).slice(0, 5);

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////
  // const unsortedData = data.allStrapiArticle.edges;
  let index = (location.state === null || !location.state) ? "" : location.state.searchQuery;

  const options = {
      // keys: [
      //     'node.title',
      //     'node.author.name',
      //     'node.content',
      // ],
      keys: [
        {
            name: 'node.title',
            weight: 0.6,
        },
        {
            // name: 'node.author',
            name: 'node.author.name',
            weight: 0.1,
        },
        {
            name: 'node.content',
            weight: 0.3,
        },
      ],
      includeScore: true,
      shouldSort: true,
      threshold: 0.3,  // default 0.6
  };
  // const fuse = new Fuse(unsortedData, options);
  const fuse = new Fuse(data.allStrapiArticle.edges, options);
  const results = fuse.search(index, { limit: 10 });
  // const searchResults = results.length > 0 ? results.map(result => result.item) : unsortedData.slice(0, 5);
  const searchResults = results.length > 0 ? results.map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

  // search query results while on route '/search'
  const currentResults = fuse.search(query, { limit: 10 });
  // const currentSearchResults = query.length > 3 ? currentResults.map(result => result.item) : unsortedData.slice(0, 5);
  const currentSearchResults = query.length > 2 ? currentResults.reverse().map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

  // console.log(currentResults, location.state.searchQuery, query)

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);

    // const { value } = currentTarget;
    // setInput(value);
  }

  // function handleSubmit(e, { currentTarget = {} }) {
  //   e.preventDefault();

  //   const { value } = currentTarget;
  //   setQuery(value);
  // }

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  return (
  <div className="flex flex-col min-h-screen justify-between">
    <SearchHeader categories={data.allStrapiCategory.edges} />
    <div className='container mx-auto' style={{maxWidth: '1036px'}}>
      <div className="pt-2 relative mx-auto text-gray-600 mb-6 pb-6 border-b">
        {/* <form onSubmit={handleSubmit}> */}
        {/* <form> */}
          <input 
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text" 
            placeholder="Search" 
            value={query} 
            // value={input} 
            onChange={handleOnSearch} 
          />
          {/* <button tpe="submit">SEARCH</button> */}
        {/* </form> */}
      </div>
      { query.length > 2 && results.length > 0 ?
      <div className="container w-2/3">
        <ul>
          {currentSearchResults.map(document => (
            <li key={document.node.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: '#ECECF3' }}>
              <div className="flex items-start">
                {document.node.image ?
                  <div className="mr-6">
                    <img src={document.node.image.publicURL} style={{ maxWidth: '210px' }} alt="" />
                  </div>
                :
                  ""
                }
                <div>
                  {/* <Link to={`/article/${document.node.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}> */}
                  <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
                    <h2 className="font-medium mb-2 text-2xl leading-tight">
                      <Highlight search={query}>{document.node.title}</Highlight>
                    </h2>
                  </Link>
                  <Highlight search={query}>
                    <ReactMarkdown
                      source={`${document.node.content.slice(0,200)}...`}
                      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                    />
                  </Highlight>
                  <p className='mb-1 text-base'>
                    By <Link to={`/author/${document.node.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                      {/* <Highlight search={query}>By{" "}{document.node.author.name}</Highlight> */}
                      <Highlight search={query}>{document.node.author.name}</Highlight>
                    </Link>
                  </p>
                  <p>
                    {handleDate(document.node.published_at)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      : query.length > 0 && results.length === 0 ?
      <div className="container w-2/3">
        No results match your search input
      </div>
      :
      <div className="container w-2/3">
        <ul>
          {searchResults.map(document => (
            <li key={document.node.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: '#ECECF3' }}>
              <div className="flex items-start">
                {document.node.image ?
                  <div className="mr-6">
                    <img src={document.node.image.publicURL} style={{ maxWidth: '210px' }} alt="" />
                  </div>
                :
                  ""
                }
                <div>
                  {/* <Link to={`/article/${document.node.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}> */}
                  <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
                    <h2 className="font-medium mb-2 text-2xl leading-tight">
                      <Highlight search={query}>{document.node.title}</Highlight>
                    </h2>
                  </Link>
                  <Highlight search={query}>
                    <ReactMarkdown
                      source={`${document.node.content.slice(0,200)}...`}
                      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                    />
                  </Highlight>
                  <p className='mb-1 text-base'>
                    By <Link to={`/author/${document.node.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                      {/* <Highlight search={query}>By{" "}{document.node.author.name}</Highlight> */}
                      <Highlight search={query}>{document.node.author.name}</Highlight>
                    </Link>
                  </p>
                  <p>
                    {handleDate(document.node.published_at)}
                  </p>
                </div>
              </div>
            </li>
            // <li key={document.node.id}>
            //   <div className="flex items-start">
            //   <h2>
            //     <Link to={`/article/${document.node.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
            //       <Highlight search={query}>{document.node.title}</Highlight>
            //     </Link>
            //   </h2>
            //   <Link to={`/author/${document.node.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
            //     <Highlight search={query}>By{" "}{document.node.author.name}</Highlight>
            //   </Link>
            //   {document.node.image ?
            //     <img src={document.node.image.publicURL} alt="" />
            //   :
            //     ""
            //   }
            //   <Highlight search={query}>
            //     <ReactMarkdown
            //       source={`${document.node.content.slice(0,500)}...`}
            //       transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            //     />
            //   </Highlight>
            //   </div>
            // </li>
          ))}
        </ul>
      </div>
      }
    </div>
    {/* <SearchFooter /> */}
    <Footer />
  </div>
  )
}


export default SearchPage;