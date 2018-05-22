/* @flow */

import * as React from "react";
import LoadableContext from "react-loadable-context";
import delay from "../../../src/utils/delay";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/prism-light";
import jsx from "react-syntax-highlighter/languages/prism/jsx";
import { ghcolors as style } from "react-syntax-highlighter/styles/prism";

registerLanguage("jsx", jsx);

type Props = {};

const { Provider, ConsumerRaw } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Loaded!";
  },
  delay: 1000,
  timeOut: 2000
});

export default class Example7ConsumerRaw extends React.Component<Props> {
  render() {
    return (
      <section id="example7">
        <h2>Example 7: Raw Consumer</h2>
        <p>
          In this example the consumer is the raw react context consumer, it
          receives more info than just the loader result.
        </p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`const { Provider, ConsumerRaw } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Loaded!";
  },
  delay: 1000,
  timeOut: 2000
});

<Provider>
  <ConsumerRaw>
    {({ data, error, loading, timedOut, pastDelay }) =>
      JSON.stringify(
        { data, error, loading, timedOut, pastDelay },
        null,
        2
      )
    }
  </ConsumerRaw>
</Provider>`}</SyntaxHighlighter>
        <h3>Result</h3>
        <Provider>
          <ConsumerRaw>
            {({ data, error, loading, timedOut, pastDelay }) =>
              JSON.stringify(
                { data, error, loading, timedOut, pastDelay },
                null,
                2
              )
            }
          </ConsumerRaw>
        </Provider>
      </section>
    );
  }
}
