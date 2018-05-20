/* @flow */

import * as React from "react";

type Props = {
  retry?: mixed => mixed,
  isLoading?: boolean,
  error?: mixed,
  timedOut?: boolean,
  pastDelay?: boolean
};

export default function Loading(props: Props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return (
        <div>
          Loader timed out!
          <button onClick={props.retry}>Retry loading</button>
        </div>
      );
    } else if (props.pastDelay) {
      return (
        <div>
          Loading is taking some time (display some activity indicator here)
        </div>
      );
    } else {
      return (
        <div>
          Before delay (display some placeholder or skeleton component here)
        </div>
      );
    }
  } else if (props.error !== null && props.error !== undefined) {
    return (
      <div>
        {props.error.toString()}
        <button onClick={props.retry}>Retry loading</button>
      </div>
    );
  } else {
    throw new Error(
      "This should not happen, but react loadable context sent wrong props to loading component"
    );
  }
}
