/* @flow */

import * as React from "react";
import type { ContextType, Loaded } from "../types";

type Props = {
  children: (data?: Loaded) => ?React.Element<*>,
  consumer: React.ComponentType<{
    children: (value?: ContextType) => ?React.Element<*>
  }>
};

type State = {};

export default class ConsumerDirect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { consumer: Consumer, children } = this.props;
    return (
      <Consumer>
        {(value?: ContextType) => {
          if (value !== null && value !== undefined) {
            if ("data" in value) {
              if (value.data !== null && value.data !== undefined) {
                return children(value.data);
              } else {
                return null;
              }
            } else {
              return null;
            }
          } else {
            return null;
          }
        }}
      </Consumer>
    );
  }
}
