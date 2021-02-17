import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from './footer'
// import "./css/styles.css"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main className='container mx-auto' style={{maxWidth: '1036px'}}>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
