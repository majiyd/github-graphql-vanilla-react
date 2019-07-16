import React from "react";
import styles from './Button.module.css'

export function Button(props) {
  return (
    <button 
      type={props.type} 
      className={styles.primary}
    >
      {props.text}
    </button>
  );
}
