/* @flow */

import * as React from "react";
import delay from "../../src/utils/delay";
import LoadableContext from "../../src/index";
import Loading from "./loading";

type Props = {};

const { Provider: ProviderSimple, Consumer: ConsumerSimple } = LoadableContext({
  loader: async () => {
    return "Loaded simply.";
  }
});

const { Provider: ProviderDelay, Consumer: ConsumerDelay } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Loaded after a delay and detailed info.";
  },
  loading: Loading,
  delay: 1000,
  timeOut: 2000
});

const {
  Provider: ProviderAsyncImport,
  Consumer: ConsumerAsyncImport
} = LoadableContext({
  loader: async () => {
    return (await import("./thingToLoad")).default;
  },
  loading: Loading
});

const { Provider: ProviderError, Consumer: ConsumerError } = LoadableContext({
  loader: async () => {
    await delay(5000);
    throw new Error("awww");
  },
  loading: Loading
});

export default class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <ProviderSimple>
          <ProviderDelay>
            <ProviderAsyncImport>
              <ProviderError>
                <div>
                  Here are a few examples
                  <p>
                    Simple:
                    <ConsumerSimple>{value => value}</ConsumerSimple>
                  </p>
                  <p>
                    Delay:
                    <ConsumerDelay>{thing => thing}</ConsumerDelay>
                  </p>
                  <p>
                    Async import using code splitting:
                    <ConsumerAsyncImport>{thing => thing}</ConsumerAsyncImport>
                  </p>
                  <p>
                    Error, does not load:
                    <ConsumerError>{thing => thing}</ConsumerError>
                  </p>
                </div>
              </ProviderError>
            </ProviderAsyncImport>
          </ProviderDelay>
        </ProviderSimple>
      </div>
    );
  }
}
