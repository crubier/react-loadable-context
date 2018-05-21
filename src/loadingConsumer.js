/* @flow */

import * as React from "react";
import LoadingEmpty from "./loading/empty";
import { type Props as LoadingProps } from "./loading";

type Props = {
  children: (data?: mixed) => ?React.Element<*>,
  consumer: React.ComponentType<{
    children: ({
      data: mixed,
      error: mixed,
      retry: mixed => mixed,
      loading: boolean,
      timedOut: boolean,
      pastDelay: boolean
    }) => React.Node
  }>,
  loading: React.ComponentType<LoadingProps>
};

type State = {};

export default class LoadingConsumer extends React.Component<Props, State> {
  static defaultProps = {
    loading: () => null
  };
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { consumer: Consumer, children, loading: Loading } = this.props;
    return (
      <Consumer>
        {({
          data,
          error,
          retry,
          loading,
          timedOut,
          pastDelay
        }: {
          data: mixed,
          error: mixed,
          retry: mixed => mixed,
          loading: boolean,
          timedOut: boolean,
          pastDelay: boolean
        }) => {
          if (
            (data !== null && data !== undefined) ||
            (Loading === null || Loading === undefined)
          ) {
            return children({
              data,
              error,
              retry,
              loading,
              timedOut,
              pastDelay
            });
          } else {
            return (
              <Loading
                retry={retry}
                loading={loading}
                error={error}
                timedOut={timedOut}
                pastDelay={pastDelay}
              />
            );
          }
        }}
      </Consumer>
    );
  }
}
