/* @flow */

import * as React from "react";
import LoadingEmpty from "../loading/empty";
import { type Props as LoadingProps } from "../loading";

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

export default class ConsumerDirectLoading extends React.Component<
  Props,
  State
> {
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
        {(
          value: ?{
            data: mixed,
            error: mixed,
            retry: mixed => mixed,
            loading: boolean,
            timedOut: boolean,
            pastDelay: boolean
          }
        ) => {
          if (value !== null && value !== undefined) {
            const { data, error, retry, loading, timedOut, pastDelay } = value;
            if (
              data !== null &&
              data !== undefined &&
              !(error !== null && error !== undefined)
            ) {
              return children(data);
            } else {
              return (
                <Loading
                  retry={retry}
                  error={error}
                  loading={loading}
                  timedOut={timedOut}
                  pastDelay={pastDelay}
                />
              );
            }
          } else {
            return null;
          }
        }

        // {
        //
        //   if (
        //     (data !== null && data !== undefined) ||
        //     (Loading === null || Loading === undefined)
        //   ) {
        //     return children({
        //       data,
        //       error,
        //       retry,
        //       loading,
        //       timedOut,
        //       pastDelay
        //     });
        //   } else {
        //     return (
        //       <Loading
        //         retry={retry}
        //         loading={loading}
        //         error={error}
        //         timedOut={timedOut}
        //         pastDelay={pastDelay}
        //       />
        //     );
        //   }
        // }
        }
      </Consumer>
    );
  }
}
