// import React, { useState } from "react"
import React from "react"
// import { Link, navigate, StaticQuery, graphql } from "gatsby"
// import { Link, StaticQuery, navigate } from "gatsby"
import { Link, navigate } from "gatsby"
// import PropTypes from "prop-types"
import logo from "../images/logo.png"

class Header extends React.Component {
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
    //   // document.addEventListener('click', this.clickOutsideSearch);
    // } else {
    //   search.classList.add("hidden");
    //   search.classList.remove("block");
    //   // document.removeEventListener('click', this.clickOutsideSearch);
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

  // clickOutsideSearch = (event) => {
  //   const target = event.target;
  //   if (target.closest("#extended-overlay") && this.state.searchOpen) {
  //     this.toggleSearchBar();
  //   }
  // }

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

    const { data } = this.props;

    return (
      <>
        <nav className="text-black mb-12 sans-serif bg-white z-50 top-0">
          <div className={this.state.menuOpen ? 'border-none' : 'border-b border-gray-300'}>
            <div className="container mx-auto py-4">
              <div className="flex mx-auto items-center justify-between px-4 sm:px-8 xl:px-0">
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
                    <img src={logo} alt="Logo" className="h-10 mx-auto" />
                  </Link>
                </div>
                <div className="w-1/4 flex justify-end items-center">
                  <div className="" id="search-input">
                    <form className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md" onSubmit={this.handleSubmit}>
                      {/* <form onSubmit={handleNavigate} className="border-black text-gray-600 flex items-center py-1 px-2 pr-1 pl-0 border-b focus-within:border-blue-600"> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search"
                        value={this.state.query}
                        // onChange={(e) => setQuery(e.target.value)}
                        onChange={this.handleChange('query')}
                        className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none ml-2"
                      />
                    </form>
                  </div>
                </div>

                {/* <div className="w-1/4 flex justify-end items-center">
                  <div className={`mr-2 ${this.state.searchOpen ? 'block' : 'hidden'}`} id="search-input">
                    <form className="border-black text-gray-600 flex items-center py-1 px-2 pr-1 pl-0 border-b focus-within:border-blue-600" onSubmit={this.handleSubmit}>
                       <form onSubmit={handleNavigate} className="border-black text-gray-600 flex items-center py-1 px-2 pr-1 pl-0 border-b focus-within:border-blue-600">
                      <input
                        type="text"
                        placeholder="Search"
                        value={this.state.query}
                        // onChange={(e) => setQuery(e.target.value)}
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
                  </button>
                </div> */}


              </div>
            </div>
          </div>

          <div className={`text-sm flex-inline space-x-6 mx-auto py-2 text-center ${this.state.menuOpen ? 'border-none' : 'border-b border-black'}`}>

            {!this.state.menuOpen ?
              <>
                {/* {
                  data.allStrapiCategory.edges.slice(1, data.allStrapiCategory.edges.length).map(document => (
                    <Link to={`/category/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} key={document.node.id} className="block mt-4 lg:inline-block lg:mt-0">
                      {document.node.title}
                    </Link>
                  ))
                } */}
                <Link to={`/category/climate-change`} className="block mt-4 lg:inline-block lg:mt-0">
                  Climate Change
                </Link>
                <Link to={`/category/life-science`} className="block mt-4 lg:inline-block lg:mt-0">
                  Life Science
                </Link>
                <Link to={`/category/tech-&-ai`} className="block mt-4 lg:inline-block lg:mt-0">
                  Technology & Artificial Intelligence
                </Link>
                <Link to={`/category/the-universe`} className="block mt-4 lg:inline-block lg:mt-0">
                  The Universe
                </Link>
                <Link to={`/category/labscopes`} className="block mt-4 lg:inline-block lg:mt-0">
                  Labscopes
                </Link>
                <Link to={`/category/people`} className="block mt-4 lg:inline-block lg:mt-0">
                  People
                </Link>
                <Link to={`/category/noteworthy-news`} className="block mt-4 lg:inline-block lg:mt-0">
                  Noteworthy News
                </Link>
                <Link to={`/category/the-scientist-life`} className="block mt-4 lg:inline-block lg:mt-0">
                  The Scientist Life
                </Link>
                <Link to={`/magazine/${data.allStrapiMagazineIssue.edges[data.allStrapiMagazineIssue.edges.length - 1].node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                  Current Magazine
                </Link>
                <Link to={`/category/archive`} className="block mt-4 lg:inline-block lg:mt-0">
                  Archive
                </Link>
                {/* <Link to={`/category/${data.allStrapiCategory.edges[0].node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} key={data.allStrapiCategory.edges[0].node.id} className="block mt-4 lg:inline-block lg:mt-0">
                  {data.allStrapiCategory.edges[0].node.title}
                </Link> */}
              </>
              :
              <div className="h-6"></div>
              }
          </div>

          {this.state.menuOpen ?
            <div className="pb-12 px-4 sm:px-8 xl:px-0 text-md absolute w-full focus:outline-none bg-white z-50 border-b" style={{ borderBottomColor: '#e2e2e2' }} id="extended-menubar">
              <div className="container mx-auto">
                <div className="md:flex md:space-x-12">
                  <div className="flex-grow md:max-w-xl mb-12 md:mb-0">
                    <h2 className="font-semibold mb-2">Categories</h2>
                    <ul className="grid gap-1 grid-cols-1 md:grid-cols-3">
                      {/* {data.allStrapiCategory.edges.slice(1, data.allStrapiCategory.edges.length).map(document => (
                        <li key={document.node.id}>
                          <Link to={`/category/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}>
                            {document.node.title}
                          </Link>
                        </li>
                      ))} */}
                      {/* <li key={data.allStrapiCategory.edges[0].node.id}>
                        <Link to={`/category/${data.allStrapiCategory.edges[0].node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}>
                          {data.allStrapiCategory.edges[0].node.title}
                        </Link>
                      </li> */}

                      <li>
                        <Link to={`/category/climate-change`} className="block mt-4 lg:inline-block lg:mt-0">
                          Climate Change
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/life-science`} className="block mt-4 lg:inline-block lg:mt-0">
                          Life Science
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/tech-&-ai`} className="block mt-4 lg:inline-block lg:mt-0">
                          Technology & Artificial Intelligence
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/the-universe`} className="block mt-4 lg:inline-block lg:mt-0">
                          The Universe
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/labscopes`} className="block mt-4 lg:inline-block lg:mt-0">
                          Labscopes
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/people`} className="block mt-4 lg:inline-block lg:mt-0">
                          People
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/noteworthy-news`} className="block mt-4 lg:inline-block lg:mt-0">
                          Noteworthy News
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/the-scientist-life`} className="block mt-4 lg:inline-block lg:mt-0">
                          The Scientist Life
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/archive`} className="block mt-4 lg:inline-block lg:mt-0">
                          Archive
                        </Link>
                      </li>          
                    </ul>
                  </div>
                  <div>
                    <h2 className="font-semibold mb-2">Magazine</h2>
                    <ul className="grid gap-1">
                      <li>
                        <Link to={`/magazine/${data.allStrapiMagazineIssue.edges[data.allStrapiMagazineIssue.edges.length - 1].node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                          Current Magazine
                        </Link>
                      </li>
                      {/* <li>Latest Issue</li> */}
                      {/* <li>Past Issues</li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            :
            ""
          }
        </nav>
        {/* {this.state.menuOpen || this.state.searchOpen ? <div className="bg-black fixed top-0 left-0 z-40 w-full h-full opacity-25" id="extended-overlay"></div> : ""} */}
        { this.state.menuOpen ? <div className="bg-black fixed top-0 left-0 z-40 w-full h-full opacity-50" id="extended-overlay"></div> : ""}
      </>
    )
  }
}
export default Header