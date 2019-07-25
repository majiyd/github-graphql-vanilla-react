import React from 'react';

const CLIENT_ID = "ae2ae2dbb55737a71a4c";
const REDIRECT_URI = "http://localhost:3000/";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "initial",
      token: null
    };
  }

  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
      console.log(code)
    if (code) {
      this.setState({ status: 'loading' });
      fetch(`https://simple-github-graphql-client.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setState({
            token,
            status: 'finished'
          });
        });
    }
  }
  render() {
    return (
      <div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
        >
          Login
        </a>
      </div>
    );
  }
}

export default Login;