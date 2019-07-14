import React from "react";
import styles from './App.module.css'
import GITHUB_GRAPHQL_CLIENT , {GET_USER} from '../../axios-config';

class App extends React.Component {
  state = {
    user: 'majiyd'
  }
  componentDidMount(){
    this.fetchFromGithub()
  }
  onChange = e => {
    this.setState({
      path: e.target.value
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
      .then(res => console.log(res))
  }
  render() {
    const { path } = this.state
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
                value={path}
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
          <div>
            <h1>Results</h1>
          </div>
      </div>
    )
  }
}

export default App;
