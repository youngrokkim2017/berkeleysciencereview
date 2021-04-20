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

    const latestIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue)[0];

    return (
      <>
        <nav className={`text-black mb-8 sans-serif bg-white z-50 top-0 ${this.state.menuOpen ? '' : 'container mx-auto'}`}>
          {/* <div className={this.state.menuOpen ? 'border-none' : 'border-b border-gray-300'}> */}
          <div className="border-b border-gray-300 px-4 md:px-8 xl:px-0">
            <div className="container mx-auto py-4">
              <div className="flex mx-auto items-center justify-between">
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
                    <img src={logo} alt="Logo" className="max-h-10 w-auto mx-auto" />
                  </Link>
                </div>
                <div className="w-1/4 flex justify-end items-center">
                  <div className="hidden md:block" id="search-input">
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
              </div>
            </div>
          </div>

          <div className={`text-center ${this.state.menuOpen ? 'border-none' : 'border-b border-black'}`}>

            {!this.state.menuOpen ?
              <div className="hidden lg:inline-block text-sm tracking-tight flex-inline space-x-6 py-2 z-0" id="horizontal-header">
                <Link to={`/category/climate-change`} className="mt-4 lg:inline-block lg:mt-0">
                  Climate Change
                </Link>
                <Link to={`/category/life-science`} className="mt-4 lg:inline-block lg:mt-0">
                  Life Science
                </Link>
                <Link to={`/category/tech-&-ai`} className="mt-4 lg:inline-block lg:mt-0">
                  Technology & Artificial Intelligence
                </Link>
                <Link to={`/category/the-universe`} className="mt-4 lg:inline-block lg:mt-0">
                  The Universe
                </Link>
                <Link to={`/category/labscopes`} className="mt-4 lg:inline-block lg:mt-0">
                  Labscopes
                </Link>
                <Link to={`/category/people`} className="mt-4 lg:inline-block lg:mt-0">
                  People
                </Link>
                <Link to={`/category/noteworthy-news`} className="mt-4 lg:inline-block lg:mt-0">
                  Noteworthy News
                </Link>
                <Link to={`/category/the-scientist-life`} className="mt-4 lg:inline-block lg:mt-0">
                  The Scientist Life
                </Link>
                <Link to={`/magazine/${latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="mt-4 hidden xl:inline-block lg:mt-0">
                  Current Magazine
                </Link>
                <Link to={`/category/archive`} className="mt-4 hidden xl:inline-block lg:mt-0">
                  Archive
                </Link>
                {/* <Link to={`/category/${data.allStrapiCategory.edges[0].node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} key={data.allStrapiCategory.edges[0].node.id} className="block mt-4 lg:inline-block lg:mt-0">
                  {data.allStrapiCategory.edges[0].node.title}
                </Link> */}
              </div>
              :
              ""
            }
          </div>
          {this.state.menuOpen ?
            <>
              <span className="hidden lg:block h-9 border-b border-white"></span>
              <div className="pt-8 lg:pt-0 pb-10 px-4 md:px-8 xl:px-0 text-md absolute w-full focus:outline-none bg-white z-50 border-b" style={{ borderBottomColor: '#e2e2e2' }} id="extended-menubar">
                <div className="container mx-auto">
                  <div className="md:flex md:space-x-24">
                    <div className="flex-grow md:max-w-xl lg:max-w-3xl mb-6 md:mb-0">
                      <div className="block md:hidden mb-8">
                        <form className="border-gray-500 text-black flex items-center py-1 pl-2 border rounded focus-within:border-blue-600 text-md" onSubmit={this.handleSubmit}>
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

                      <h2 className="font-semibold mb-2">Categories</h2>
                      <ul className="grid gap-1 grid-cols-1 md:grid-cols-3 space-y-0">

                        <li>
                          <Link to={`/category/climate-change`} className="block lg:inline-block md:mt-0">
                            Climate Change
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/life-science`} className="block lg:inline-block md:mt-0">
                            Life Science
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/tech-&-ai`} className="block lg:inline-block md:mt-0">
                            Technology & Artificial Intelligence
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/the-universe`} className="block lg:inline-block md:mt-0">
                            The Universe
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/labscopes`} className="block lg:inline-block md:mt-0">
                            Labscopes
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/people`} className="block lg:inline-block md:mt-0">
                            People
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/noteworthy-news`} className="block lg:inline-block md:mt-0">
                            Noteworthy News
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/the-scientist-life`} className="block lg:inline-block md:mt-0">
                            The Scientist Life
                        </Link>
                        </li>
                        <li>
                          <Link to={`/category/archive`} className="block lg:inline-block md:mt-0">
                            Archive
                        </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="font-semibold mb-2">Magazine</h2>
                      <ul className="grid gap-1">
                        <li>
                          <Link to={`/magazine/${latestIssue.node.title.split(" ").map((a) => a.toLowerCase()).join("-")}`}>
                            Current Magazine
                        </Link>
                        </li>
                        {/* <li>Latest Issue</li> */}
                        {/* <li>Past Issues</li> */}
                        <li>
                          <Link to={`/magazine-issues`}>
                            Past Issues
                        </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
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