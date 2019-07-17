import React from "react";
import styles from './App.module.css'
import {Repositories} from '../Repositories'
import {Button} from '../components/Button'
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
    this.fetchFromGithub(this.state.user)
  }
  onChange = e => {
    this.setState({
      user: e.target.value
    })
  }
  onSubmit = e => {
    this.fetchFromGithub(this.state.user)
    e.preventDefault()
  }
  fetchMoreRepositories = () => {
    const {endCursor} = this.state.repositories.pageInfo
    this.fetchFromGithub(this.state.user, endCursor)
    console.log('fetching more')
  }
  fetchFromGithub = (user, cursor) => {
    GITHUB_GRAPHQL_CLIENT.post('', {
        query: GET_USER,
        variables: {user, cursor}
      })
      .then(res => {
        this.setState({
          url: res.data.data.user.url,
          repositories: res.data.data.user.repositories,
          errors: null
        })
      })
      .catch(err => {
        this.setState({
          errors: err
        })
      })
  }
  render() {
    const { user, url, errors, repositories} = this.state
    return (
      <div className={styles.app}>
        <h1>Github Client</h1>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <div>
              <label htmlFor="github-user" >
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
            <Button 
              type={'submit'} 
              text={'Submit'}
            />
          </form>
          <hr style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            marginBottom: '4%'
          }}/>
          <Repositories 
            name={user} 
            url={url} 
            repositories={repositories}
            errors={errors}
            onFetchMoreRepositories={this.fetchMoreRepositories}
          />
      </div>
    )
  }
}

export default App;
