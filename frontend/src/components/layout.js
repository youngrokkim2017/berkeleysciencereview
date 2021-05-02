import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from './footer'
import "./css/styles.css"
import { useStaticQuery, graphql } from "gatsby"

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
      allStrapiMagazineIssue(
        sort: {order: DESC, fields: issue}
      ) {
        edges {
          node {
            id
            title
            issue
            pdf {
              publicURL
            }
          }
        }
      }
    }
  `);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={data}/>
      <main className='container mx-auto px-4 md:px-8 lg:px-4' style={{ maxWidth: '960px' }}>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
