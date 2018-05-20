/* @flow */

import * as React from "react";
import Provider from "./provider";
import LoadingConsumerComponent from "./loadingConsumer";
import DirectConsumerComponent from "./directConsumer";
import { type Props as LoadingProps } from "./loading";

export default function LoadableContext({
  loader,
  loading,
  timeOut,
  delay
}: {
  loader: mixed => Promise<mixed>,
  loading?: React.ComponentType<LoadingProps>,
  timeOut?: number,
  delay?: number
}): {
  Provider: React.ComponentType<{ children: React.Node }>,
  Consumer: React.ComponentType<{ children: (value: mixed) => React.Node }>
} {
  const {
    Provider: RawProvider,
    Consumer: RawConsumer
  } = React.createContext();
  const Provider = (props: mixed) => (
    <Provider
      provider={RawProvider}
      loader={loader}
      timeOut={timeOut}
      delay={delay}
      {...props}
    />
  );
  const LoadingConsumer = (props: mixed) => (
    <LoadingConsumerComponent
      consumer={RawConsumer}
      loading={loading}
      {...props}
    />
  );
  const DirectConsumer = (props: mixed) => (
    <DirectConsumerComponent
      consumer={RawConsumer}
      loading={loading}
      {...props}
    />
  );
  return {
    Provider,
    Consumer: DirectConsumer,
    DirectConsumer: DirectConsumer,
    LoadingConsumer: LoadingConsumer,
    RawConsumer: RawConsumer
  };
}
