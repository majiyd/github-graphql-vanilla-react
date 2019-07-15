import React from "react";
import styles from './App.module.css'
import {Repositories} from '../Repositories'
import GITHUB_GRAPHQL_CLIENT , {GET_USER} from '../../axios-config';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: 'majiyd',
      url: null,
      errors: null,
      repositories: []
    }

  }
  
  componentDidMount(){
    this.fetchFromGithub()
  }
  onChange = e => {
    this.setState({
      user: e.target.value
    })
  }
  onSubmit = e => {
    this.fetchFromGithub()
    e.preventDefault()
  }
  fetchFromGithub = () => {
    GITHUB_GRAPHQL_CLIENT
      .post('', {
        query: GET_USER
      })
      .then(res => {
        this.setState({
          url: res.data.data.user.url,
          errors: res.data.errors,
          repositories: res.data.data.user.repositories
        })
        
      })
  }
  render() {
    const { user, url, repositories} = this.state
    return (
      <div className={styles.app}>
        <h1>GraphQl Client</h1>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <div>
              <label htmlFor="github-user">
                Get all repos by:
              </label>
              <input 
                id="github-user"
                type="text"
                onChange={this.onChange}
                className={styles.input}
                value={user}
              />
            </div>
            <button 
              type="submit" 
              className={styles.submit}
            > Submit </button>
          </form>
          <hr style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            marginBottom: '4%'
          }}/>
          <Repositories 
            name={user} 
            url={url} 
            repositories={repositories}
          />
      </div>
    )
  }
}

export default App;
