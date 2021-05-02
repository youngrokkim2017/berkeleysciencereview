import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Fuse from "fuse.js"
import SearchHeader from '../components/searchHeader'
import Footer from '../components/footer'
import SearchIndexItems from '../components/searchIndexItems'

const SearchPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query SearchResultsQuery {
      allStrapiArticle(
        sort: { fields: [published_at], order: DESC }
      ) {
        edges {
          node {
            id
            title
            author {
              id
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
            pdf {
              publicURL
            }
          }
        }
      }
    }
  `)

  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////
  let index = (location.state === null || !location.state) ? "" : location.state.searchQuery;

  const options = {
    keys: [
      {
        name: 'node.title',
        weight: 0.7,
      },
      {
        name: 'node.author.name',
        weight: 0.3,
      },
    ],
    includeScore: true,
    isCaseSensitive: false,
    shouldSort: true,
    ignoreLocation: true,
    threshold: 0.3,
  };
  // search results coming from header route to search route
  const fuse = new Fuse(data.allStrapiArticle.edges, options);
  const results = fuse.search(index, { limit: 10 });
  const searchResults = results.length > 0 ? results.map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

  // search query results while on route '/search'
  const currentResults = fuse.search(query, { limit: 10 });
  const currentSearchResults = query.length > 2 ? currentResults.map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

  function handleOnSearch(e) {
    // function handleOnSearch({ currentTarget = {} }) {
    // const { value } = currentTarget;
    // setQuery(value);

    e.preventDefault();
    setQuery(searchTerm);
  }

  function handleOnChange({ currentTarget = {} }) {
    const { value } = currentTarget;
    setSearchTerm(value);
  }

  // // function handleOnChange(e) {
  // //   setSearchTerm(e.target.value);
  // // }

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <SearchHeader data={data} />
      <div className="container mx-auto px-4 md:px-8 lg:px-4">

        <div className="pt-2 relative text-gray-600 mb-6 pb-6 border-b" id="search-input">
          <form className="bg-gray-100 text-gray-600 flex items-center px-4 py-2 pr-2 border focus-within:border-blue-600 rounded sans-serif max-w-md" onSubmit={handleOnSearch}>
            {searchTerm.length > 0 ?
              <button onClick={handleOnSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              :
              <button className="cursor-default" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            }
            <input
              className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none ml-2 sans-serif"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleOnChange}
            />
          </form>
        </div>
        {query.length > 2 && currentResults.length > 0 ?
          <SearchIndexItems searchData={currentSearchResults} searchQuery={query} />
          : (query.length > 0 && currentResults.length === 0) || (results.length === 0) ?
            <div className="container mx-auto sans-serif">
              No results match your search input
          </div>
            :
            <SearchIndexItems searchData={searchResults} searchQuery={query} />
        }
      </div>
      <Footer />
    </div>
  )
}

export default SearchPage;