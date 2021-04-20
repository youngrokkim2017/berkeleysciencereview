// import React from "react"
// import { Link, graphql, useStaticQuery } from "gatsby"
// import Fuse from "fuse.js"  // fuzzy search
// import SearchHeader from '../components/searchHeader'
// import Footer from '../components/footer';
// import SearchIndexItems from '../components/searchIndexItems';

// export const data = graphql`
//       query SearchResultsQuery {
//         allStrapiArticle(
//           sort: { fields: [published_at], order: DESC }
//         ) {
//           edges {
//             node {
//               id
//               title
//               author {
//                 id
//                 name
//               }
//               content
//               image {
//                 publicURL
//               }
//               categories {
//                 id
//                 title
//               }
//               published_at
//               updatedAt
//             }
//           }
//         }
//         allStrapiCategory {
//           edges {
//             node {
//               id
//               title
//             }
//           }
//         }
//         allStrapiMagazineIssue {
//           edges {
//             node {
//               id
//               issue
//               title
//               pdf {
//                 publicURL
//               }
//             }
//           }
//         }
//       }
//     `

// const options = {
//   keys: [
//     {
//       name: 'node.title',
//       weight: 0.6,
//     },
//     {
//       name: 'node.author.name',
//       weight: 0.1,
//     },
//     {
//       name: 'node.content',
//       weight: 0.3,
//     },
//   ],
//   includeScore: true,
//   isCaseSensitive: false,
//   shouldSort: true,
//   ignoreLocation: true,
//   threshold: 0.3, 
// };

// class SearchPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             query: '',
//             searchTerm: '',
//             index: (this.props.location.state === null || !this.props.location.state) ? "" : this.props.location.state.searchQuery,
//         };
//     }

//     handleInput(type) {
//         return (e) => {
//             this.setState({
//                 [type]: e.currentTarget.value
//             });
//         }
//     }

//     handleOnSearch(type, e) {
//       return (e) => {
//         e.preventDefault();
//             this.setState({
//                 [type]: this.state.searchTerm
//             });
//         }
//     }

//     render() {
//         console.log(this.props, this.state);

//         const { searchTerm } = this.state;

//         const fuse = new Fuse(this.props.data.allStrapiArticle.edges, options);
//         const results = fuse.search(this.state.index, { limit: 10 });
//         const searchResults = results.length > 0 ? results.map(result => result.item) : this.props.data.allStrapiArticle.edges.slice(0, 5);

//         // search query results while on route '/search'
//         const currentResults = fuse.search(this.state.query, { limit: 10 });
//         const currentSearchResults = this.state.query.length > 2 ? currentResults.map(result => result.item) : this.props.data.allStrapiArticle.edges.slice(0, 5);

//         return (
//           <div className="flex flex-col min-h-screen justify-between">
//             <SearchHeader data={this.props.data} />
//             <div className="container mx-auto px-4 sm:px-6 xl:px-6">

//               <div className="pt-2 relative text-gray-600 mb-6 pb-6 border-b" id="search-input">
//                 {/* <div className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm"> */}
//                 {/* <form className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm" onSubmit={() => this.handleOnSearch('query')}> */}
//                 <form className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md max-w-sm" onSubmit={this.handleOnSearch('query')}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                   <input
//                     className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none ml-2 sans-serif"
//                     type="text"
//                     placeholder="Search"
//                     // value={this.state.query}
//                     // onChange={handleOnSearch}
//                     value={searchTerm}
//                     onChange={this.handleInput('searchTerm')}
//                   />
//                   {/* <MyInput /> */}
//                 </form>
//                 {/* </div> */}
//               </div>
//               {this.state.query.length > 2 && currentResults.length > 0 ?
//                 <SearchIndexItems searchData={currentSearchResults} searchQuery={this.state.query} />
//               : (this.state.query.length > 0 && currentResults.length === 0) || (results.length === 0) ?
//                 <div className="container mx-auto sans-serif">
//                   No results match your search input
//                 </div>
//               : 
//                 <SearchIndexItems searchData={searchResults} searchQuery={this.state.query} />
//               }
//             </div>
//             <Footer />
//           </div>
//         )
//     }
// }

// export default SearchPage;

// // class MyInput extends React.Component {
// //   constructor() {
// //     super();
// //     this.state = {value: ""};
// //   }

// //   update = (e) => {
// //     this.setState({value: e.target.value});
// //   }

// //   render() {
// //     return (
// //       <input onChange={this.update} value={this.state.value} />
// //     );
// //   }
// // }