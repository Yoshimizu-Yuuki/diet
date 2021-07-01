import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulDiet.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>記事がないよ！</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const date = new Date(post.dateTime)
          const dateTitle = date.toLocaleString("ja", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })

          return (
            <li key={post.dateTime}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.contentful_id} itemProp="url">
                      <span itemProp="headline">{dateTitle}</span>
                    </Link>
                  </h2>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulDiet {
      nodes {
        id
        contentful_id
        dateTime
        weight
        breakfast
        lunch
        dinner
        snack
        exercise
        aword
      }
    }
  }
`
