import React from "react";
import styles from "./Button.module.css";

export function Button(props) {
  switch (props.isDisabled) {
    case true: {
      return (
        <button
          type={props.type}
          className={styles.primary}
          onClick={props.handleClick}
          disabled
        >
          {props.text}
        </button>
      );
    }
    default: {
      return (
        <button
          type={props.type}
          className={styles.primary}
          onClick={props.handleClick}
        >
          {props.text}
        </button>
      );
    }
  }
}
