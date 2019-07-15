import React from 'react';
import styles from './Repositories.module.css'

export function Repositories(props){
  return(
    <div className={styles.repositories}>
      <h1>Repositories</h1>
      <a href={props.url}>See On Github</a>
      <div>
        {(props.repositories === undefined || props.repositories.length === 0) ? (
          <h2>No Information Available</h2>
        ):(
          
          <ul className={styles.repos}>
            
            {props.repositories.edges.map(edge => (
              <li key={edge.node.url}>{edge.node.name} <a href={edge.node.url}>{edge.node.url}</a></li>
            ))}
          </ul>
          
        )}
      </div>
    </div>
  )
}