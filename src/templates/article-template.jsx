import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ArticleTemplateDetails from '../components/ArticleTemplateDetails'
import favicon from '../pages/favicon.ico'

class ArticleTemplate extends React.Component {
  render() {
    const { title, subtitle, searchConsole } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { title: postTitle, description: postDescription } = post.frontmatter
    const description = postDescription !== null ? postDescription : subtitle
    const tags = post.frontmatter.tags.map((item) => { 
      return tags ? `${tags}, ${item}` : `${item}`;
    });

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${postTitle} - ${title}`}</title>
            <meta name="description" content={description} />
            <meta name="google-site-verification" content={searchConsole} />
            <meta name="keywords" content={tags} />
            <meta name="robots" content="index,follow" />
            <link rel="shortcut icon" href={favicon} />
          </Helmet>
          <ArticleTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        searchConsole
        author {
          name
          facebook
        }
        disqusShortname
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`
