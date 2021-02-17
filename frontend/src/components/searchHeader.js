// import React, { useState } from "react"
import React from "react"
// import { Link, navigate, StaticQuery, graphql } from "gatsby"
// import { Link, StaticQuery, navigate } from "gatsby"
import { Link, navigate } from "gatsby"
// import PropTypes from "prop-types"
import logo from "../images/logo.png"

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      menuOpen: false, 
      searchOpen: false,
    }; 

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const hamburger = document.getElementById("hamburger");
    // const search = document.getElementById("search-input");

    if (this.state.menuOpen) {
      hamburger.classList.add('is-active');
      document.addEventListener('click', this.clickOutsideHamburger);
    } else {
      hamburger.classList.remove('is-active');
      document.removeEventListener('click', this.clickOutsideHamburger);
    }

    // if (this.state.searchOpen) {
    //   search.classList.remove("hidden");
    //   search.classList.add("block");
    //   document.addEventListener('click', this.clickOutsideSearch);
    // } else {
    //   search.classList.add("hidden");
    //   search.classList.add("remove");
    //   document.removeEventListener('click', this.clickOutsideSearch);
    // }
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  }

  toggleSearchBar = () => {
    this.setState({ searchOpen: !this.state.searchOpen })
  }

  clickOutsideHamburger = (event) => {
    const target = event.target;
    if (target.closest("#extended-overlay") && this.state.menuOpen) {
      this.closeMenu();
    }
  }

  clickOutsideSearch = (event) => {
    const target = event.target;
    if (target.closest("#extended-overlay") && this.state.searchOpen) {
      this.toggleSearchBar();
    }
  }

  handleChange(type) {
    return (e) => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    navigate("/search/", { state: { searchQuery: this.state.query } })
  }

  render() {
    // const [query, setQuery] = useState('');

    // function handleNavigate(e) {
    //   e.preventDefault()
    //   navigate("/search/", { state: { searchQuery: query } })
    // }
    
    const { categories } = this.props;
    // const nonArchiveCategories = categories.splice(0, categories.length - 1);

    return (
      <>
        <nav className="text-black mb-12 sans-serif bg-white z-20"> {/*border-t-4" style={{ borderTopColor: '#003262' }}*/}
          <div className={this.state.menuOpen || this.state.searchOpen ? 'border-none': 'border-b'} style={{ borderBottomColor: '#e2e2e2' }}>
            <div className="container mx-auto py-4">
              <div className="flex mx-auto items-center justify-between px-4 sm:px-0">
                <div className="w-1/4">
                  <span className="">
                    <button className="hamburger hamburger--slider" type="button" id="hamburger" onClick={!this.state.menuOpen ? this.openMenu : this.closeMenu}>
                      <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                      </span>
                    </button>
                  </span>
                </div>
                <div className="items-center text-center">
                  <Link to="/" className="font-semibold text-2xl tracking-tight">
                    <img src={logo} alt="Logo" className="h-8 mx-auto" />
                  </Link>
                </div>
                <div className="w-1/4 flex justify-end items-center">
                  {/* <div className="hidden mr-2" id="search-input">
                    <form className="border-black text-gray-600 flex items-center py-1 px-2 pr-1 pl-0 border-b focus-within:border-blue-600" onSubmit={this.handleSubmit}>
                      <input
                        type="text"
                        placeholder="Search"
                        value={this.state.query}
                        onChange={this.handleChange('query')}
                        className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none mr-2"
                      />
                      <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </form>
                  </div>
                  <button onClick={this.toggleSearchBar} className="inline-block leading-none text-black flex-shrink-0 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {this.state.menuOpen ?
            <div className="py-8 px-4 sm:px-0 text-sm absolute w-full focus:outline-none bg-white z-20" id="extended-menubar">
              <div className="container mx-auto py-2" style={{ maxWidth: '1036px' }}>

                <div className="flex">
                  <div className="flex-grow max-w-xl">
                    <h2 className="uppercase font-semibold mb-6">Categories</h2>
                    <ul className="grid gap-4 grid-cols-3">
                      <>
                        {/* {nonArchiveCategories.map(document => ( */}
                        {categories.map(document => (
                          <li key={document.node.id}>
                            <Link to={`/category/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}>
                              {document.node.title}
                            </Link>
                          </li>
                        ))}
                      </>
                      {/* <li>
                        <Link to="/archive/1">Archive</Link>
                      </li> */}
                    </ul>
                  </div>
                  <div>
                    <h2 className="uppercase font-semibold mb-6">Magazine</h2>
                    <ul className="grid gap-4">
                      <li>Latest Issue</li>
                      <li>Past Issues</li>
                    </ul>
                  </div>
                  {/* <div className="">
                  <h2 className="uppercase font-semibold mb-4">Popular</h2>
                  <ul className="grid gap-2">
                    <li>Latest Issue</li>
                    <li>Past Issues</li>
                  </ul>
                </div> */}
                </div>
              </div>
            </div>
            :
            ""
          }
        </nav>
        {this.state.menuOpen || this.state.searchOpen ? <div className="bg-black fixed top-0 left-0 z-10 w-full h-full opacity-25" id="extended-overlay"></div> : ""}
      </>
    )
  }
}
export default SearchHeader;

// import React from "react"
// import { Link } from "gatsby"
// import logo from "../images/logo.png"

// const SearchHeader = ({ categories }) => {
//     return (
//       <nav className="text-black mb-12 container mx-auto sans-serif">
//         <div className="border-b py-4" style={{ borderBottomColor: '#ECECF3' }}>
//           <div className="flex mx-auto items-center justify-between flex-wrap">
//             <div className="w-1/4">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </div>
//             <div className="flex items-center text-center">
//               <Link to="/" className="font-semibold text-2xl tracking-tight">
//                 <img src={logo} alt="Logo" className="sm:h-10 mx-auto" />
//               </Link>
//             </div>
//             <div className="relative w-1/4 flex justify-end items-center">
              
//             </div>
//           </div>
//         </div>
//         <div className="container mx-auto text-center py-2 border-b border-black">
//           <div className="">
//             <div className="text-base space-x-4 mx-auto">
//               {categories.map((document, idx) => (
//                 <Link 
//                   to={`/category/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} 
//                   key={idx} 
//                   className="block mt-4 lg:inline-block lg:mt-0"
//                 >
//                   {document.node.title}
//                 </Link>
//               ))}
//               <Link 
//                 to="/archive/1" 
//                 className="block mt-4 lg:inline-block lg:mt-0">
//                 Archive
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     )
// }

// export default SearchHeader
