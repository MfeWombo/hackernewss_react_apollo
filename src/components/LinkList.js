//Here, you’re using local mock data for now to make sure the component setup works. You’ll soon replace this with some actual data loaded from the server - patience, young Padawan!
import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {
  render() {
  // 1
  if (this.props.feedQuery && this.props.feedQuery.loading) {
    return <div>Loading</div>
  }

  // 2
  if (this.props.feedQuery && this.props.feedQuery.error) {
    return <div>Error</div>
  }

  // 3
  const linksToRender = this.props.feedQuery.feed.links

  return (
    <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
  )
}
}
// 1
const FEED_QUERY = gql`

  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

// 3
export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList)

// First, you create the JavaScript constant called FEED_QUERY that stores the query. The gql function is used to parse the plain string that contains the GraphQL code (if you’re unfamililar with the backtick-syntax, you can read up on JavaScript’s tagged template literals).
// Now you define the actual GraphQL query. FeedQuery is the operation name and will be used by Apollo to refer to this query under the hood. (Also notice the # which denotes a GraphQL comment).
// Finally, you’re using the graphql container to “wrap” the LinkList component with the FEED_QUERY. Note that you’re also passing an options object to the function call where you specify the name to be feedQuery. This is the name of the prop that Apollo injects into the LinkList component. If you didn’t specify it here, the injected prop would be called data by default.