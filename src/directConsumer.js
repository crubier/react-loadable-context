/* @flow */

import * as React from "react";
import LoadingEmpty from "./loading/empty";
import { type Props as LoadingProps } from "./loading";

type Props = {
  children: React.Node,
  consumer: React.ComponentType<{
    children: (data: mixed) => React.Node
  }>
};

type State = {};

export default class DirectConsumer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { consumer: Consumer, children } = this.props;
    return (
      <Consumer>
        {(data: mixed) => {
          if (data !== null && data !== undefined) {
            return children(data);
          } else {
            return null;
          }
        }}
      </Consumer>
    );
  }
}
