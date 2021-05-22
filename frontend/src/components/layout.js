import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from './footer'
import "./css/styles.css"
import { Link, useStaticQuery, graphql } from "gatsby"

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
      <Header data={data} />
      <main className='container mx-auto px-4 md:px-8 lg:px-4' style={{ maxWidth: '960px' }}>{children}</main>
      <a href="https://forms.gle/QnnTu8sfCAGKkdWe7" id="report" className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-3 text-white rounded-full space-x-4 sans-serif">
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
