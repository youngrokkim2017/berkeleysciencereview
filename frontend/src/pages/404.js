import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="text-center sans-serif max-w-md mx-auto">
      <h1 className="text-6xl font-bold">404</h1>
      <p>Sorry, we couldn't find this page. But don't worry, you can find plenty of articles on our <Link to="/" className="underline">homepage</Link>.</p>
      <Link to="/contact" className="inline-block px-4 py-2 leading-none text-white bg-black flex-shrink-0 cursor-pointer sans-serif mt-8">
        Contact Support
    </Link>
    </div>

  </Layout>
)

export default NotFoundPage
