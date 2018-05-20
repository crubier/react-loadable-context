/* @flow */

import * as React from "react";
import Provider from "./provider";

export default function LoadableContext({
  loader,
  loading,
  timeOut,
  delay
}: {
  loader: mixed => Promise<mixed>,
  delay?: number,
  timeOut?: number,
  loading?: React.ComponentType<{
    retry?: mixed => mixed,
    isLoading?: boolean,
    error?: mixed,
    timedOut?: boolean,
    pastDelay?: boolean
  }>
}): {
  Provider: React.ComponentType<{}>,
  Consumer: React.ComponentType<{ children: (value: mixed) => React.Node }>
} {
  const { Provider: RawProvider, Consumer } = React.createContext();
  const Provider = (props: mixed) => (
    <Provider
      provider={RawProvider}
      loader={loader}
      loading={loading}
      timeOut={timeOut}
      delay={delay}
      {...props}
    />
  );
  return { Provider, Consumer };
}
