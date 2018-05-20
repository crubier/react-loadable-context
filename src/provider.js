/* @flow */

import * as React from "react";
import delay from "./delay";

type Props = {
  loader: mixed => Promise<mixed>,
  delay: number,
  timeOut: number,
  children: React.Node,
  provider: React.ComponentType<{
    value: mixed
  }>,
  loading: React.ComponentType<{
    retry?: mixed => mixed,
    isLoading?: boolean,
    error?: mixed,
    timedOut?: boolean,
    pastDelay?: boolean
  }>
};

type State = {
  value: mixed,
  error: mixed,
  timedOut: boolean,
  pastDelay: boolean
};

export default class LoadableProvider extends React.Component<Props, State> {
  startLoading: () => void;
  load: () => Promise<void>;
  manageDelay: () => Promise<void>;
  manageTimeOut: () => Promise<void>;
  static defaultProps = {
    delay: 300,
    timeOut: 30000,
    loading: () => null
  };
  constructor(props: Props) {
    super(props);
    this.startLoading = this._startLoading.bind(this);
    this.load = this._load.bind(this);
    this.manageDelay = this._manageDelay.bind(this);
    this.manageTimeOut = this._manageTimeOut.bind(this);
    this.state = {
      value: null,
      error: null,
      timedOut: false,
      pastDelay: false
    };
  }
  componentDidMount() {
    this.startLoading();
  }
  _startLoading() {
    this.setState({
      value: null,
      error: null,
      timedOut: false,
      pastDelay: false
    });
    this.load();
    this.manageDelay();
    this.manageTimeOut();
  }
  async _load() {
    try {
      const loaded = await this.props.loader(this.props);
      this.setState({ value: loaded });
    } catch (e) {
      this.setState({ error: e });
    }
  }
  async _manageDelay() {
    await delay(this.props.delay);
    if (this.state.value !== null && this.state.value !== undefined) {
      return;
    } else {
      this.setState({ pastDelay: true });
    }
  }
  async _manageTimeOut() {
    await delay(this.props.timeOut);
    if (this.state.value !== null && this.state.value !== undefined) {
      return;
    } else {
      this.setState({ timedOut: true });
    }
  }
  render() {
    if (this.state.value !== null && this.state.value !== undefined) {
      const { provider: Provider, children } = this.props;
      const { value } = this.state;
      return <Provider value={value}>{children}</Provider>;
    } else {
      const { loading: Loading } = this.props;
      const { error, timedOut, pastDelay } = this.state;
      return (
        <Loading
          retry={this.startLoading}
          isLoading={error === undefined || error === null}
          error={error}
          timedOut={timedOut}
          pastDelay={pastDelay}
        />
      );
    }
  }
}
