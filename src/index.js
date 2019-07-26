import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import App from './views/App'
import {UserProvider} from './context'



class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      token: null,
      isFetching: false
    }
  }
  render() { 
    return (
      <div>
        {this.state.isFetching ? (
          <h3 style={{ 
            textAlign: "center",
            position: 'fixed',
            color: "#E10098",
            width: "100%",
            zIndex: '3',
            textShadow: "0 1px 2px rgba(255, 0, 152,.1)"
          }}>Loading...</h3>
        ) : (
          ""
        )}
        <UserProvider value={{
          state: this.state,
          setFetchingToTrue: () => {
            this.setState({isFetching: true})
          },
          unSetFetchingToFalse: () => {
            this.setState({isFetching: false})
          },
          setToken: (token) => {
            this.setState({token: token})
          }
        }}>
          <App token={this.state.token}/>
        </UserProvider>
      </div>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById('root'));