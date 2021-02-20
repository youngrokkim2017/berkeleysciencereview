import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from './footer'
import "./css/styles.css"
import { useStaticQuery } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      allStrapiCategory {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={data.allStrapiCategory.edges} />
      <main className='container mx-auto' style={{maxWidth: '1036px'}}>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
