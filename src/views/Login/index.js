import React from 'react';
import * as context from '../../context.js'
import styles from './Login.module.css'

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
          window.token = token
        });
    }
  }
  render() {
    return (
      <div className={styles.login}>
        <h1> Github Client</h1>
        <div style={{
          marginBottom: "12%"
        }}>
          <p>This is a simple app built by <a href="https://github.com/majiyd">majiyd</a>. It is based on chapter 3 of Robin Wieruch's <a href="https://www.robinwieruch.de/graphql-tutorial/">graphQL  tutorial</a>.</p>
          <p>In this app, you can search for github users, star or unstar their repositories</p>
        </div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          onClick={()=>{this.context.setFetchingToTrue()}}
          style={{
            backgroundColor: "#E10098",
            color: "white",
            padding: " 2% 3%",
            margin: "0 1%",
            borderRadius: "3px",
          }}
        >
          Signin with Github
        </a>
      </div>
    );
  }
}


Login.contextType = context.UserContext;
export default Login;