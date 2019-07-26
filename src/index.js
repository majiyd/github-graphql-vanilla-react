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
      isFetching: true
    }
  }
  render() { 
    return (
      <div>
        {this.state.isFetching ? (
          <h3 style={{ 
            textAlign: "center",
            position: 'absolute',
            color: "#E10098",
            width: "100%",
            zIndex: '-1'
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
          setToken: token => {
            this.setState({token: token})
          }
        }}>
          <App />
        </UserProvider>
      </div>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById('root'));