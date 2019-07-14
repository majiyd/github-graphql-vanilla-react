import React from 'react';
import styles from './Repositories.module.css'

export function Repositories(props){
  return(
    <div className={styles.repositories}>
      <h1>Repositories</h1>
      <a href={props.url}>On Github</a>
    </div>
  )
}