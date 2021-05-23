import React from "react"
import { Link } from "gatsby"
import logo from "../images/logo.png"

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      menuOpen: false,
      searchOpen: false,
    };
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

  render() {
    const { data } = this.props;

    const latestIssue = data.allStrapiMagazineIssue.edges.sort((a, b) => b.node.issue - a.node.issue)[0];

    return (
      <>
        <nav className={`text-black mb-8 sans-serif bg-white z-50 top-0 ${this.state.menuOpen ? '' : 'container mx-auto'}`}>
          {/* <div className={this.state.menuOpen ? 'border-none' : 'border-b border-gray-300'}> */}
          <div className={`${this.state.menuOpen ? '' : 'px-0 md:px-8 lg:px-4'}`}>
            <div className="border-b border-gray-300">
              <div className={`container mx-auto py-4 ${this.state.menuOpen ? 'px-4 md:px-8 lg:px-4' : 'px-4 md:px-0'}`} >
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!this.state.menuOpen ?
              <div className="hidden lg:block text-sm tracking-tight space-x-4 py-1 z-0 container px-16 border-b border-black">
                <div className="flex justify-between content-center" id="horizontal-header">
                  <Link to={`/category/climate-change`}>
                    Climate Change
                    </Link>
                  <Link to={`/category/life-science`}>
                    Life Science
                    </Link>
                  <Link to={`/category/tech-&-ai`}>
                    Technology & Artificial Intelligence
                    </Link>
                  <Link to={`/category/the-universe`}>
                    The Universe
                    </Link>
                  <Link to={`/category/labscopes`}>
                    Labscopes
                    </Link>
                  <Link to={`/category/people`}>
                    People
                    </Link>
                  <Link to={`/category/noteworthy-news`}>
                    Noteworthy News
                    </Link>
                  <Link to={`/category/the-scientist-life`}>
                    The Scientist Life
                    </Link>
                  <Link to={`/magazine/${latestIssue.node.title.split(" ").filter(i => i).map((a) => a.toLowerCase()).join("-")}`} className="hidden xl:inline-block">
                    Current Magazine
                      </Link>
                  <Link to={`/category/archive`} className="hidden xl:inline-block">
                    Archive
                    </Link>
                </div>
              </div>
              :
              ""
            }
          </div>
          {this.state.menuOpen ?
            <>
              <span className="hidden lg:block h-10"></span>
              <div className="pt-8 lg:pt-0 pb-10 text-md absolute w-full focus:outline-none bg-white z-50 border-b" style={{ borderBottomColor: '#e2e2e2' }} id="extended-menubar">
                <div className="container mx-auto px-4 md:px-8 lg:px-4">
                  <div className="md:flex md:space-x-24">
                    <div className="flex-grow md:max-w-xl lg:max-w-3xl mb-6 md:mb-0">
                      <div className="block md:hidden mb-8">
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
                          <Link to={`/magazine/${latestIssue.node.title.split(" ").filter(i => i).map((a) => a.toLowerCase()).join("-")}`}>
                            Current Magazine
                            </Link>
                        </li>
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

export default SearchHeader
