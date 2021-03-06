/* @flow */

import * as React from "react";
import type { ContextType } from "../types";

type Props = ContextType;

export default function LoadingRetryButton(props: Props) {
  if (props.loading) {
    // Nominal loading is going on
    if (props.timedOut) {
      // Timeout, user may want to retry
      return <button onClick={props.retry}>Retry</button>;
    } else if (props.pastDelay) {
      // Displaying the loading indicator
      return null;
    } else {
      // Displaying a skeleton component
      return null;
    }
  } else if (
    props.error !== null &&
    props.error !== undefined &&
    props.error.toString !== null &&
    props.error.toString !== undefined
  ) {
    // An error happenned
    return (
      <div>
        {props.error.toString()}
        <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else {
    // What ? This should not happen
    throw new Error(
      "This should not happen, but react loadable context sent wrong props to loading component"
    );
  }
}
