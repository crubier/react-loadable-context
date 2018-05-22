/* @flow */

import * as React from "react";
import ProviderComponent from "./provider";
import ConsumerDirectComponent from "./consumer/direct";
import ConsumerDirectLoadingComponent from "./consumer/directLoading";
import ConsumerRawComponent from "./consumer/raw";
import ConsumerRawLoadingComponent from "./consumer/rawLoading";
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
    <ProviderComponent
      provider={RawProvider}
      loader={loader}
      timeOut={timeOut}
      delay={delay}
      {...props}
    />
  );
  const ConsumerDirect = (props: mixed) => (
    <ConsumerDirectComponent consumer={RawConsumer} {...props} />
  );
  const ConsumerDirectLoading = (props: mixed) => (
    <ConsumerDirectLoadingComponent
      consumer={RawConsumer}
      loading={loading}
      {...props}
    />
  );
  const ConsumerRaw = (props: mixed) => (
    <ConsumerRawComponent consumer={RawConsumer} {...props} />
  );
  const ConsumerRawLoading = (props: mixed) => (
    <ConsumerRawLoadingComponent
      consumer={RawConsumer}
      loading={loading}
      {...props}
    />
  );
  return {
    Provider,
    Consumer: ConsumerDirect,
    ConsumerLoading: ConsumerDirectLoading,
    ConsumerDirect,
    ConsumerDirectLoading,
    ConsumerRaw,
    ConsumerRawLoading
  };
}
