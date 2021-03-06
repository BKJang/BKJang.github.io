import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import TagTemplateDetails from '../components/TagTemplateDetails'
import favicon from '../pages/favicon.ico'

class TagTemplate extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata
    const { tag } = this.props.pageContext

    return (
      <Layout>
        <div>
          <Helmet title={`All Posts tagged as "${tag}" - ${title}`} >
            <link rel="shortcut icon" href={favicon} />
          </Helmet>
          <Sidebar {...this.props} />
          <TagTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        searchConsole
        menu {
          label
          path
          subItem { 
            label
            path
          }
        }
        author {
          name
          email
          facebook
          github
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          layout: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`
