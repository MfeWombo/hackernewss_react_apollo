import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  render() {
    return (
      <div>
     
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={this.state.url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button onClick={() => this._createLink()}>Submit</button>
      </div>
    )
  }

  _createLink = async () => {
  const { description, url } = this.state
  await this.props.postMutation({
    variables: {
      description,
      url,
    },
  })
  this.props.history.push('/')
}
    
}

//First you need to define the mutation in your JavaScript code and wrap your component with the graphql container
// 1 You first create the JavaScript constant called POST_MUTATION that stores the mutation.
const POST_MUTATION = gql`
  # 2 Now you define the actual GraphQL mutation. It takes two arguments, url and description, that you’ll have to provide when invoking the mutation.
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

// 3 Lastly, you’re using the graphql container to combine the CreateLink component with the POST_MUTATION. 
//The specified name again refers to the name of the prop that’s injected into CreateLink. This time, a function will be injected that’s called postMutation and that you can invoke and pass in the required arguments.
export default graphql(POST_MUTATION, { name: 'postMutation' })(CreateLink)

