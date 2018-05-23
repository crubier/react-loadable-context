/* @flow */

import * as React from "react";
import type { ContextType } from "../types";

type Props = {
  children: (value?: ContextType) => ?React.Element<*>,
  consumer: React.ComponentType<{
    children: (value?: ContextType) => ?React.Element<*>
  }>
};

type State = {};

export default class ConsumerRaw extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { consumer: Consumer, children } = this.props;
    return <Consumer>{(value?: ContextType) => children(value)}</Consumer>;
  }
}
