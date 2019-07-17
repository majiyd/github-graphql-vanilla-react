import React from 'react';
import styles from './Star.module.css'

export function Star(props){
  switch (props.viewerHasStarred){
    case true: {
      return (
        <span className={styles.star}>
          <abbr title='Unstar Repository'>&#9733;</abbr>
        </span>
      )
    }
    case false: {
      return (
        <span className={styles.star}>
          <abbr title='Star Repository'>&#9734;</abbr>
        </span>
      )
    }
    default:
      return (
        <span className={styles.star}>
          <abbr title='Star Repository'>&#9734;</abbr>
        </span>
      )
  }
}