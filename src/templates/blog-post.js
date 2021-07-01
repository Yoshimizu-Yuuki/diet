import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulDiet
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const date = new Date(post.dateTime)
  const dateTitle = date.toLocaleString("ja", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.dateTime} description={""} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{dateTitle}</h1>
        </header>
        <section>
          <h3>日付</h3>
          <p>{dateTitle}</p>
          <h3>体重</h3>
          <p>{post.weight}kg</p>
          <h3>朝ごはん</h3>
          <p>{post.breakfast}</p>
          <h3>昼ご飯</h3>
          <p>{post.lunch}</p>
          <h3>夜ご飯</h3>
          <p>{post.dinner}</p>
          <h3>間食</h3>
          <p>{post.snack}</p>
          <h3>運動</h3>
          <p>{post.exercise}</p>
          <h3>一言</h3>
          <p>{post.aword}</p>
        </section>
        <footer></footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.contentful_id} rel="prev">
                ← {previous.dateTime}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.contentful_id} rel="next">
                {next.dateTime} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulDiet(id: { eq: $id }) {
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
    previous: contentfulDiet(id: { eq: $previousPostId }) {
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
    next: contentfulDiet(id: { eq: $nextPostId }) {
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
`
