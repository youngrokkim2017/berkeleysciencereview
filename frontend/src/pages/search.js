import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import React from 'react';
import SearchPreview from '../components/searchPreview';
import SearchHeader from '../components/searchHeader';
import Footer from '../components/footer';
import { graphql, useStaticQuery } from 'gatsby';

const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
const searchClient = algoliasearch(appId, searchKey);

const SearchPage = () => {
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

  return (
  <InstantSearch
    searchClient={searchClient}
    indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
  >
    <SearchHeader data={data} />
    <SearchBox />
    <Hits hitComponent={SearchPreview} />
    <Footer />
  </InstantSearch>
  )
};
export default SearchPage;

// import React, { useState, useRef } from "react"
// // import React, { useState, useEffect, useMemo, useCallback } from "react"
// import { Link, graphql, useStaticQuery } from "gatsby"
// // import ReactMarkdown from "react-markdown"
// import Fuse from "fuse.js"  // fuzzy search
// import Highlight from 'react-highlighter'
// import SearchHeader from '../components/searchHeader'
// import Footer from '../components/footer';
// import SearchIndexItems from '../components/searchIndexItems';

// // class SearchPage extends React.Component {
// //   render() {
// //     console.log(this.props);

// //     return (
// //       <div>hi</div>
// //     )
// //   }
// // }

// const SearchPage = ({ location }) => {
//   const data = useStaticQuery(graphql`
//     query SearchResultsQuery {
//       allStrapiArticle(
//         sort: { fields: [published_at], order: DESC }
//       ) {
//         edges {
//           node {
//             id
//             title
//             author {
//               id
//               name
//             }
//             content
//             image {
//               publicURL
//             }
//             categories {
//               id
//               title
//             }
//             published_at
//             updatedAt
//           }
//         }
//       }
//       allStrapiCategory {
//         edges {
//           node {
//             id
//             title
//           }
//         }
//       }
//       allStrapiMagazineIssue {
//         edges {
//           node {
//             id
//             issue
//             title
//             pdf {
//               publicURL
//             }
//           }
//         }
//       }
//     }
//   `)

//   const [query, setQuery] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   ///////////////////////////// FUSE SEARCH ///////////////////////////////////
//   let index = (location.state === null || !location.state) ? "" : location.state.searchQuery;

//   const options = {
//     keys: [
//       {
//         name: 'node.title',
//         weight: 0.6,
//       },
//       {
//         // name: 'node.author',
//         name: 'node.author.name',
//         weight: 0.1,
//       },
//       {
//         name: 'node.content',
//         weight: 0.3,
//       },
//     ],
//     includeScore: true,
//     isCaseSensitive: false,
//     shouldSort: true,
//     // location: 0,
//     // distance: 1000,
//     ignoreLocation: true,
//     threshold: 0.3,  // default 0.6
//   };
//   // search results coming from header route to search route
//   const fuse = new Fuse(data.allStrapiArticle.edges, options);
//   const results = fuse.search(index, { limit: 10 });
//   // const searchResults = results.length > 0 ? results.reverse().map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);
//   const searchResults = results.length > 0 ? results.map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

//   // search query results while on route '/search'
//   const currentResults = fuse.search(query, { limit: 10 });
//   // const currentSearchResults = query.length > 2 ? currentResults.reverse().map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);
//   const currentSearchResults = query.length > 2 ? currentResults.map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

//   function handleOnSearch(e) {
//   // function handleOnSearch({ currentTarget = {} }) {
//     // const { value } = currentTarget;
//     // setQuery(value);

//     e.preventDefault();
//     setQuery(searchTerm);
//   }

//   function handleOnChange({ currentTarget = {} }) {
//     const { value } = currentTarget;
//     setSearchTerm(value);
//   }

//   // // function handleOnChange(e) {
//   // //   setSearchTerm(e.target.value);
//   // // }

//   ///////////////////////////// FUSE SEARCH ///////////////////////////////////

//   function handleDate(e) {
//     var d = new Date(e);
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return d.toLocaleDateString(undefined, options)
//   }

//   return (
//     <div className="flex flex-col min-h-screen justify-between">
//       <SearchHeader data={data} />
//       <div className="container mx-auto px-4 sm:px-6 xl:px-6">

//         <div className="pt-2 relative text-gray-600 mb-6 pb-6 border-b" id="search-input">
//           {/* <div className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm"> */}
//           <form className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm" onSubmit={handleOnSearch}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <input
//               className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none ml-2 sans-serif"
//               type="text"
//               placeholder="Search"
//               // value={query}
//               // onChange={handleOnSearch}
//               value={searchTerm}
//               onChange={handleOnChange}
//             />
//           </form>
//           {/* </div> */}
//         </div>
//         {/* {query.length > 2 && results.length > 0 ? */}
//         {query.length > 2 && currentResults.length > 0 ?
//           <SearchIndexItems searchData={currentSearchResults} searchQuery={query} />
//           // <div className="container mx-auto">
//           //   <ul>
//           //     {currentSearchResults.map(document => (
//           //       <li key={document.node.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: '#ECECF3' }}>
//           //         <div className="flex items-start">
//           //           <div className="mr-6 flex-grow">
//           //             <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
//           //               <h2 className="font-medium mb-2 text-2xl leading-none">
//           //                 <Highlight search={query}>{document.node.title}</Highlight>
//           //               </h2>
//           //             </Link>
//           //             <p className='mb-2 text-base'>
//           //               By <Link to={`/author/${document.node.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
//           //                 <Highlight search={query}>{document.node.author.name}</Highlight>
//           //               </Link>
//           //             </p>
//           //             <p className='my-2'>
//           //               {handleDate(document.node.published_at)}
//           //             </p>
//           //           </div>
//           //           {document.node.image ?
//           //             <div>
//           //               <img src={document.node.image.publicURL} style={{ maxWidth: '210px' }} alt="" />
//           //             </div>
//           //             :
//           //             ""
//           //           }
//           //         </div>
//           //       </li>
//           //     ))}
//           //   </ul>
//           // </div>
//         // : query.length > 0 && results.length === 0 ?
//         // : (query.length > 0 && currentResults.length === 0) || (location.state.searchQuery.length > 0 && results.length === 0) ?
//         : (query.length > 0 && currentResults.length === 0) || (results.length === 0) ?
//           <div className="container mx-auto sans-serif">
//             No results match your search input
//           </div>
//         : 
//           <SearchIndexItems searchData={searchResults} searchQuery={query} />
//           // <div className="container mx-auto">
//           //   <ul>
//           //     {searchResults.map(document => (
//           //       <li key={document.node.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: '#ECECF3' }}>
//           //       <div className="flex items-start">
//           //         <div className="mr-6 flex-grow">
//           //           <Link to={`/article/${document.node.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
//           //             <h2 className="font-medium mb-2 text-2xl leading-none">
//           //               <Highlight search={query}>{document.node.title}</Highlight>
//           //             </h2>
//           //           </Link>
//           //           <p className='mb-2 text-base'>
//           //             By <Link to={`/author/${document.node.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
//           //               <Highlight search={query}>{document.node.author.name}</Highlight>
//           //             </Link>
//           //           </p>
//           //           <p className='my-2'>
//           //             {handleDate(document.node.published_at)}
//           //           </p>
//           //         </div>
//           //         {document.node.image ?
//           //           <div>
//           //             <img src={document.node.image.publicURL} style={{ maxWidth: '210px' }} alt="" />
//           //           </div>
//           //           :
//           //           ""
//           //         }
//           //       </div>
//           //     </li>
//           //     ))}
//           //   </ul>
//           // </div>
//         }
//       </div>
//       <Footer />
//     </div>
//   )
// }


// export default SearchPage;


// // CLASS COMPONENT

// // import React from "react"
// // import { Link, graphql, useStaticQuery } from "gatsby"
// // import Fuse from "fuse.js"  // fuzzy search
// // import SearchHeader from '../components/searchHeader'
// // import Footer from '../components/footer';
// // import SearchIndexItems from '../components/searchIndexItems';

// // export const data = graphql`
// //       query SearchResultsQuery {
// //         allStrapiArticle(
// //           sort: { fields: [published_at], order: DESC }
// //         ) {
// //           edges {
// //             node {
// //               id
// //               title
// //               author {
// //                 id
// //                 name
// //               }
// //               content
// //               image {
// //                 publicURL
// //               }
// //               categories {
// //                 id
// //                 title
// //               }
// //               published_at
// //               updatedAt
// //             }
// //           }
// //         }
// //         allStrapiCategory {
// //           edges {
// //             node {
// //               id
// //               title
// //             }
// //           }
// //         }
// //         allStrapiMagazineIssue {
// //           edges {
// //             node {
// //               id
// //               issue
// //               title
// //               pdf {
// //                 publicURL
// //               }
// //             }
// //           }
// //         }
// //       }
// //     `

// // const options = {
// //   keys: [
// //     {
// //       name: 'node.title',
// //       weight: 0.6,
// //     },
// //     {
// //       name: 'node.author.name',
// //       weight: 0.1,
// //     },
// //     {
// //       name: 'node.content',
// //       weight: 0.3,
// //     },
// //   ],
// //   includeScore: true,
// //   isCaseSensitive: false,
// //   shouldSort: true,
// //   ignoreLocation: true,
// //   threshold: 0.3, 
// // };

// // class SearchPage extends React.Component {
// //     constructor(props) {
// //         super(props);

// //         this.state = {
// //             query: '',
// //             searchTerm: '',
// //             index: (this.props.location.state === null || !this.props.location.state) ? "" : this.props.location.state.searchQuery,
// //         };
// //     }

// //     handleInput(type) {
// //         return (e) => {
// //             this.setState({
// //                 [type]: e.currentTarget.value
// //             });
// //         }
// //     }

// //     handleOnSearch(type, e) {
// //       return (e) => {
// //         e.preventDefault();
// //             this.setState({
// //                 [type]: this.state.searchTerm
// //             });
// //         }
// //     }

// //     render() {
// //         console.log(this.props, this.state);

// //         const { searchTerm } = this.state;

// //         const fuse = new Fuse(this.props.data.allStrapiArticle.edges, options);
// //         const results = fuse.search(this.state.index, { limit: 10 });
// //         const searchResults = results.length > 0 ? results.map(result => result.item) : this.props.data.allStrapiArticle.edges.slice(0, 5);

// //         // search query results while on route '/search'
// //         const currentResults = fuse.search(this.state.query, { limit: 10 });
// //         const currentSearchResults = this.state.query.length > 2 ? currentResults.map(result => result.item) : this.props.data.allStrapiArticle.edges.slice(0, 5);

// //         return (
// //           <div className="flex flex-col min-h-screen justify-between">
// //             <SearchHeader data={this.props.data} />
// //             <div className="container mx-auto px-4 sm:px-6 xl:px-6">

// //               <div className="pt-2 relative text-gray-600 mb-6 pb-6 border-b" id="search-input">
// //                 {/* <div className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm"> */}
// //                 {/* <form className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm" onSubmit={() => this.handleOnSearch('query')}> */}
// //                 <form className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm" onSubmit={this.handleOnSearch('query')}>
// //                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                   </svg>
// //                   <input
// //                     className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none ml-2 sans-serif"
// //                     type="text"
// //                     placeholder="Search"
// //                     // value={this.state.query}
// //                     // onChange={handleOnSearch}
// //                     value={searchTerm}
// //                     onChange={this.handleInput('searchTerm')}
// //                   />
// //                   {/* <MyInput /> */}
// //                 </form>
// //                 {/* </div> */}
// //               </div>
// //               {this.state.query.length > 2 && currentResults.length > 0 ?
// //                 <SearchIndexItems searchData={currentSearchResults} searchQuery={this.state.query} />
// //               : (this.state.query.length > 0 && currentResults.length === 0) || (results.length === 0) ?
// //                 <div className="container mx-auto sans-serif">
// //                   No results match your search input
// //                 </div>
// //               : 
// //                 <SearchIndexItems searchData={searchResults} searchQuery={this.state.query} />
// //               }
// //             </div>
// //             <Footer />
// //           </div>
// //         )
// //     }
// // }

// // export default SearchPage;

// // // class MyInput extends React.Component {
// // //   constructor() {
// // //     super();
// // //     this.state = {value: ""};
// // //   }

// // //   update = (e) => {
// // //     this.setState({value: e.target.value});
// // //   }

// // //   render() {
// // //     return (
// // //       <input onChange={this.update} value={this.state.value} />
// // //     );
// // //   }
// // // }