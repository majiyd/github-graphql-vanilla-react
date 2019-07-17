import React from 'react';
import styles from './Repositories.module.css'
import {Button} from '../components/Button'
import {Star} from '../components/Star'

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
                <li key={edge.node.id}>
                  <Star 
                    viewerHasStarred={edge.node.viewerHasStarred} 
                    starRepository={props.starRepository}
                    unStarRepository={props.unStarRepository}
                  />
                  {edge.node.name} <a href={edge.node.url}>{edge.node.url}</a>
                </li>
              ))}
            </ul>
            {props.repositories.pageInfo.hasNextPage ? (
              <Button 
                text="Next" 
                handleClick={props.onFetchMoreRepositories}/>
              ):(
                <Button 
                  text="Next"
                  isDisabled={true}
                />
              )
            }
            
          </React.Fragment>
          
        )}
      </div>
    </div>
  )
}