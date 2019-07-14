import React from "react";
import styles from './App.module.css'

class App extends React.Component {
  state = {
    user: 'majiyd'
  }
  componentDidMount(){

  }
  onChange = e => {
    this.setState({
      path: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault()
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
