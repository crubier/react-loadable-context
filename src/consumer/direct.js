/* @flow */

import * as React from "react";
import LoadingEmpty from "../loading/empty";
import { type Props as LoadingProps } from "../loading";

type Props = {
  children: (data?: mixed) => ?React.Element<*>,
  consumer: React.ComponentType<{
    children: (value?: { [string]: mixed }) => ?React.Element<*>
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
        {(value?: { [string]: mixed }) => {
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
