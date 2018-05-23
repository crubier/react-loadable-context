/* @flow */

import * as React from "react";
import type { ContextType, Loaded } from "../types";

type Props = {
  children: (data?: Loaded) => ?React.Element<*>,
  consumer: React.ComponentType<{
    children: (value?: ContextType) => React.Node
  }>,
  loading: React.ComponentType<ContextType>
};

type State = {};

export default class ConsumerRawLoading extends React.Component<Props, State> {
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
        {(value?: ContextType) => {
          if (value !== null && value !== undefined) {
            const { data, error } = value;
            if (
              data !== null &&
              data !== undefined &&
              !(error !== null && error !== undefined)
            ) {
              return children(value);
            } else {
              return <Loading {...value} />;
            }
          } else {
            return null;
          }
        }}
      </Consumer>
    );
  }
}
