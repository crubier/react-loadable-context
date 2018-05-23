/* @flow */

import * as React from "react";

export type ContextType = {|
  data: Loaded,
  error: Error,
  timedOut: boolean,
  pastDelay: boolean,
  loading: boolean,
  retry: void => void,
  setData: Loaded => void,
  getData: void => Loaded
|};

export type Error = mixed;
export type Loaded = mixed;

export type Loadable = void => Promise<Loaded> | Loaded;

export type LoadableContextFunctionArgs = {|
  loader: Loadable,
  loading?: React.ComponentType<ContextType>,
  timeOut?: number,
  delay?: number
|};
