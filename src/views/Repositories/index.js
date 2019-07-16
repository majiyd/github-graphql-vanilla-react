import React from 'react';
import styles from './Repositories.module.css'

export function Repositories(props){
  return(
    <div className={styles.repositories}>
      <h1>Repositories</h1>
      <div>
        {(props.repositories === undefined || props.repositories.length === 0 || props.errors) ? (
          <h2 style={{textAlign: "center"}}>No Information Available</h2>
        ):(
          <React.Fragment>
            <a href={props.url}>See On Github</a>
            <ul className={styles.repos}>
              
              {props.repositories.edges.map(edge => (
                <li key={edge.node.id}>{edge.node.name} <a href={edge.node.url}>{edge.node.url}</a></li>
              ))}
            </ul>
            {props.repositories.pageInfo.hasNextPage ? (
              <button 
                onClick={props.onFetchMoreRepositories}
              >Next</button>
              ):(
                <button disabled>Next</button>
              )
            }
            
          </React.Fragment>
          
        )}
      </div>
    </div>
  )
}