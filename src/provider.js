/* @flow */

import * as React from "react";
import delay from "./utils/delay";

type Props = {
  loader: mixed => Promise<mixed>,
  delay: number,
  timeOut: number,
  children: React.Node,
  provider: React.ComponentType<{
    value: {
      data: mixed,
      error: mixed,
      loading: boolean,
      timedOut: boolean,
      pastDelay: boolean,
      retry: mixed => mixed
    }
  }>
};

type State = {
  data: mixed,
  error: mixed,
  timedOut: boolean,
  pastDelay: boolean
};

export default class Provider extends React.Component<Props, State> {
  startLoading: () => void;
  loadLoader: () => Promise<void>;
  manageDelay: () => Promise<void>;
  manageTimeOut: () => Promise<void>;
  mounted: boolean;
  static defaultProps = {
    delay: 300,
    timeOut: 30000,
    loading: () => null
  };
  constructor(props: Props) {
    super(props);
    this.startLoading = this._startLoading.bind(this);
    this.loadLoader = this._loadLoader.bind(this);
    this.manageDelay = this._manageDelay.bind(this);
    this.manageTimeOut = this._manageTimeOut.bind(this);
    this.state = {
      data: null,
      error: null,
      timedOut: false,
      pastDelay: false
    };
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    this.startLoading();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  _startLoading() {
    if (this.mounted) {
      this.setState({
        data: null,
        error: null,
        timedOut: false,
        pastDelay: false
      });
      this.loadLoader();
      this.manageDelay();
      this.manageTimeOut();
    }
  }
  async _loadLoader() {
    try {
      const loaded = await this.props.loader(this.props);
      if (this.mounted) {
        this.setState({ data: loaded });
      }
    } catch (e) {
      if (this.mounted) {
        this.setState({ error: e });
      }
    }
  }
  async _manageDelay() {
    await delay(this.props.delay);
    if (this.state.data !== null && this.state.data !== undefined) {
      return;
    } else {
      if (this.mounted) {
        this.setState({ pastDelay: true });
      }
    }
  }
  async _manageTimeOut() {
    await delay(this.props.timeOut);
    if (this.state.data !== null && this.state.data !== undefined) {
      return;
    } else {
      if (this.mounted) {
        this.setState({ timedOut: true });
      }
    }
  }
  render() {
    // if (this.state.data !== null && this.state.data !== undefined) {
    const { provider: Provider, children } = this.props;
    const { data, error, timedOut, pastDelay } = this.state;
    return (
      <Provider
        value={{
          data,
          error,
          loading:
            !(data !== undefined && data !== null) &&
            !(error !== undefined && error !== null),
          timedOut,
          pastDelay,
          retry: this.startLoading
        }}
      >
        {children}
      </Provider>
    );
  }
}
