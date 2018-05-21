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
        <section>
          <h1>Here are a few examples</h1>
          <ProviderSimple>
            <ProviderDelay>
              <ProviderAsyncImport>
                <ProviderError>
                  <dl>
                    <dt>Simple:</dt>
                    <dd>
                      <ConsumerSimple>{value => value}</ConsumerSimple>
                    </dd>
                    <dt>Delay:</dt>
                    <dd>
                      <ConsumerDelay>{thing => thing}</ConsumerDelay>
                    </dd>
                    <dt>Async import using code splitting:</dt>
                    <dd>
                      <ConsumerAsyncImport>
                        {thing => thing}
                      </ConsumerAsyncImport>
                    </dd>
                    <dt> Error, does not load:</dt>
                    <dd>
                      <ConsumerError>{thing => thing}</ConsumerError>
                    </dd>
                  </dl>
                </ProviderError>
              </ProviderAsyncImport>
            </ProviderDelay>
          </ProviderSimple>
        </section>
        <section>
          <h1>Here are a few examples</h1>
          <ProviderSimple>
            <ProviderDelay>
              <ProviderAsyncImport>
                <ProviderError>
                  <dl>
                    <dt>Simple:</dt>
                    <dd>
                      <ConsumerSimple>{value => value}</ConsumerSimple>
                    </dd>
                    <dt>Delay:</dt>
                    <dd>
                      <ConsumerDelay>{thing => thing}</ConsumerDelay>
                    </dd>
                    <dt>Async import using code splitting:</dt>
                    <dd>
                      <ConsumerAsyncImport>
                        {thing => thing}
                      </ConsumerAsyncImport>
                    </dd>
                    <dt> Error, does not load:</dt>
                    <dd>
                      <ConsumerError>{thing => thing}</ConsumerError>
                    </dd>
                  </dl>
                </ProviderError>
              </ProviderAsyncImport>
            </ProviderDelay>
          </ProviderSimple>
        </section>
      </div>
    );
  }
}
