import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="Page not found" />
    <div className="sans-serif max-w-lg">
      <h1 className="text-5xl font-bold mb-4">Page not found</h1>
      <p>Sorry, we couldn't find this page. Don't worry, you can find plenty of articles on our <Link to="/" className="underline">homepage</Link>.</p>
      <p className="mt-4">If you believe this is an error, <Link to ="/contact" className="underline">contact support</Link>.</p>
    </div>
  </Layout>
)

export default NotFoundPage
