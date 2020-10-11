import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
  
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostContentfulTemplate = ({ data, pageContext, location }) => {
  const post = data.contentfulPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        description={post.subtitle}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <Img className="post-header-image" fluid={post.image?.fluid}/>
          <h1 itemProp="headline">{post.title}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.content.childContentfulRichText.html  }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
        
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
              <Link to={`/${previous.node.slug}`} rel="prev">
                ← {previous.node.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.node.slug}`} rel="next">
                {next.node.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost( slug: { eq: $slug}){
      title
      subtitle
      author
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      content {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
