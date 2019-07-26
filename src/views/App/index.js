import React from "react";
import styles from './App.module.css'
import {Repositories} from '../Repositories'
import {Button} from '../components/Button'
import Login from '../Login'
import {UserContext} from '../../context'
import GITHUB_GRAPHQL_CLIENT , {
  GET_USER, 
  FETCH_PREVIOUS_REPOSITORIES,
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY
} from '../../axios-config';

class App extends React.Component {
  static contextType = UserContext;
  constructor(props){
    super(props)
    this.state = {
      user: 'majiyd',
      searchingUser: null,
      url: null,
      errors: null,
      repositories: [],
    }
    this.starRepository = this.starRepository.bind(this)
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
    this.fetchFromGithub(this.state.searchingUser, endCursor)
    
  }
  fetchFromGithub = (user, cursor) => {
    this.context.setFetchingToTrue()
    GITHUB_GRAPHQL_CLIENT.post('', {
        query: GET_USER,
        variables: {user, cursor}
      })
      .then(res => {
        this.setState({
          url: res.data.data.user.url,
          repositories: res.data.data.user.repositories,
          errors: null,
          searchingUser: res.data.data.user.name,
        })
        this.context.unSetFetchingToFalse()
      })
      .catch(err => {
        this.setState({
          errors: err
        })
        this.context.unSetFetchingToFalse()
      })
    
    
  }
  fetchPreviousRepositories = () => {
    this.context.setFetchingToTrue()
    const user = this.state.searchingUser
    const {endCursor} = this.state.repositories.pageInfo
    GITHUB_GRAPHQL_CLIENT.post('', {
      query: FETCH_PREVIOUS_REPOSITORIES,
      variables: {user, endCursor}
    })
    .then(res => {
      this.setState({
        repositories: res.data.data.user.repositories,
        errors: null,
      })
      this.context.unSetFetchingToFalse()
    })
    .catch(err => {
      this.setState({
        errors: err
      })
      this.context.unSetFetchingToFalse()
    })
  }
  starRepository = (repositoryId) => {
    this.context.setFetchingToTrue()
    return GITHUB_GRAPHQL_CLIENT.post('', {
      query: STAR_REPOSITORY,
      variables: {repositoryId}
    })
    .then( res => {
      this.context.unSetFetchingToFalse()
      const newEdges = this.state.repositories.edges.map(edge => {
        if(edge.node.id === repositoryId){
          const newEdge = {
            ...edge,
            node:{
              ...edge.node,
              viewerHasStarred: true
            }
          }
          return newEdge
        } else{
          return edge
        }
      })
      
      return this.setState({
        repositories:{
          ...this.state.repositories,
          edges: newEdges
        }
      })
    })
    .catch(err => {
      this.setState({errors: err})
      this.context.unSetFetchingToFalse()
    })
  }
  unStarRepository = (repositoryId) => {
    this.context.setFetchingToTrue()
    return GITHUB_GRAPHQL_CLIENT.post('', {
      query: UNSTAR_REPOSITORY,
      variables: {repositoryId}
    })
      .then(res => {
        this.context.unSetFetchingToFalse()
        const newEdges = this.state.repositories.edges.map(edge => {
          if (edge.node.id === repositoryId){
            const newEdge = {
              ...edge,
              node: {
                ...edge.node,
                viewerHasStarred: false
              }
              
            }
            return newEdge
          } else {
            return edge
          }
        })
        
        return this.setState({
          repositories: {
            ...this.state.repositories,
            edges: newEdges
          }
        })
      })
      .catch(err => {
        this.setState({errors: err})
        this.context.unSetFetchingToFalse()
      })
  }
  render() {
    const { user, url, errors, repositories} = this.state
    if (this.props.token) {
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
              onFetchPreviousRepositories={this.fetchPreviousRepositories}
              starRepository={this.starRepository}
              unStarRepository={this.unStarRepository}
            />
        </div>
      )
    } else {
      return( <Login />)
    }   
  }  
}

App.contextType = UserContext
export default App;