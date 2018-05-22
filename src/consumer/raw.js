/* @flow */

import * as React from "react";
import LoadingEmpty from "../loading/empty";
import { type Props as LoadingProps } from "../loading";

type Props = {
  children: (value?: { [string]: mixed }) => ?React.Element<*>,
  consumer: React.ComponentType<{
    children: (value?: { [string]: mixed }) => ?React.Element<*>
  }>
};

type State = {};

export default class ConsumerRaw extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { consumer: Consumer, children } = this.props;
    return (
      <Consumer>{(value?: { [string]: mixed }) => children(value)}</Consumer>
    );
  }
}
