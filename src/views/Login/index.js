import React from 'react';
import * as context from '../../context.js'

//ever heard of cyclic dependencies? don't ever make that mistake again

const CLIENT_ID = "ae2ae2dbb55737a71a4c";
const REDIRECT_URI = "http://localhost:3000/";

class Login extends React.Component {
  static contextType = context.UserContext;
  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.context.setFetchingToTrue()
      fetch(
        `https://simple-github-graphql-client.herokuapp.com/authenticate/${code}`
      )
        .then(response => response.json())
        .then(({ token }) => {
          this.context.unSetFetchingToFalse()
          token ? (this.context.setToken(1)):(this.context.setToken(0))
          // this.context.setToken(token)
          window.token = token
          console.log('l', window.token)
        });
    }
  }
  render() {
    return (
      <div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          onClick={(e)=>{this.context.setFetchingToTrue()}}
        >
          Login
        </a>
      </div>
    );
  }
}


Login.contextType = context.UserContext;
export default Login;