import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Fuse from "fuse.js"
import SearchHeader from '../components/searchHeader'
import Footer from '../components/footer'
import SearchIndexItems from '../components/searchIndexItems'
import Seo from "../components/seo"
import "../components/css/styles.css"

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
            authors {
              id
              name
            }
            designers {
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
            magazine {
              id
              title
              issue
            }
            published_at
            updatedAt
          }
        }
      }
      allStrapiMagazineIssue(
        sort: {order: DESC, fields: issue}
      ) {
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
        weight: 1,
      },
      {
        // name: 'node.author.name',
        name: 'node.authors.name',
        weight: 0.5,
      },
      {
        // name: 'node.author.name',
        name: 'node.designers.name',
        weight: 0.5,
      },
      {
        name: 'node.categories.title',
        weight: 0.25,
      },
      {
        name: 'node.magazine.title',
        weight: 0.25,
      },
      {
        name: 'node.magazine.issue',
        weight: 0.25,
      }
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
    e.preventDefault();
    setQuery(searchTerm);
  }

  function handleOnChange({ currentTarget = {} }) {
    const { value } = currentTarget;
    setSearchTerm(value);
  }

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Seo
        title={"Search"}
      />
      <SearchHeader data={data} />
      <div className="container mx-auto px-4 md:px-8 lg:px-4  max-width-960">
        <div className="relative text-gray-600 mb-6 pb-6 border-b" id="search-input">
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
              className="bg-transparent border-none w-full text-black placeholder-gray-600 focus:outline-none ml-2 sans-serif"
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
      {/* <Link to={`https://docs.google.com/forms/d/e/1FAIpQLSdMCiDUSUOxaK6tPFR0jimZnEX0gvVPwPcJ6V9PvSQzTryvmw/viewform?usp=pp_url&entry.299816419=${this.props.location.href}`} id="report" className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-3 text-white rounded-full space-x-4 sans-serif"> */}
      <a href={`https://docs.google.com/forms/d/e/1FAIpQLSdMCiDUSUOxaK6tPFR0jimZnEX0gvVPwPcJ6V9PvSQzTryvmw/viewform?usp=pp_url&entry.299816419=${location.href}`} id="report" className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-3 text-white rounded-full space-x-4 sans-serif">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block align-middle" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="inline-block align-middle">
          <p className="m-0 p-0 text-lg font-extrabold">Notice something wrong?</p>
          <p>Please report it here.</p>
        </span>
      </a>
      <Footer />
    </div>
  )
}

export default SearchPage;