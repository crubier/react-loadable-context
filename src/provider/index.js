/* @flow */

import * as React from "react";
import delay from "../utils/delay";
import isPromise from "../utils/isPromise";
import type { ContextType, Loadable, Loaded } from "../types";

type Props = {
  loader: Loadable,
  delay: number,
  timeOut: number,
  children: React.Node,
  provider: React.ComponentType<{
    value: ContextType
  }>
};

type State = $Diff<
  ContextType,
  {|
    loading: boolean,
    retry: void => void,
    setData: Loaded => void,
    getData: void => Loaded
  |}
>;

export default class Provider extends React.Component<Props, State> {
  startLoading: () => void;
  setData: Loaded => void;
  getData: void => Loaded;
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
    this.setData = this._setData.bind(this);
    this.getData = this._getData.bind(this);
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
  _setData(data: mixed) {
    this.setState({
      data: data,
      error: null,
      timedOut: false,
      pastDelay: false
    });
  }
  _getData(): mixed {
    return this.state.data;
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
      const loadee = this.props.loader(this.props);
      let loaded;
      if (isPromise(loadee)) {
        loaded = await loadee;
      } else {
        loaded = loadee;
      }
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
          timedOut,
          pastDelay,
          loading:
            !(data !== undefined && data !== null) &&
            !(error !== undefined && error !== null),
          retry: this.startLoading,
          setData: this.setData,
          getData: this.getData
        }}
      >
        {children}
      </Provider>
    );
  }
}
