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

const { Provider, Consumer, ConsumerRaw } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Initially loaded data !";
  }
});

export default class Example8State extends React.Component<Props> {
  render() {
    return (
      <section id="example8">
        <h2>Example 8: State manipulation</h2>
        <p>
          In this example the consumer uses the <code>setData</code> and{" "}
          <code>getData</code> to directly modify the context's data.
        </p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`const { Provider, Consumer, ConsumerRaw } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Initially loaded data !";
  }
});

<Provider>
  <Consumer>{data => data}</Consumer>
  <ConsumerRaw>
    {({ setData }) => (
      <button
        onClick={() =>
          setData(
            "New data set manually at " + new Date().toTimeString()
          )
        }
      >
        Set data
      </button>
    )}
  </ConsumerRaw>
</Provider>`}</SyntaxHighlighter>
        <h3>Result</h3>
        <Provider>
          <Consumer>{data => data}</Consumer>
          <ConsumerRaw>
            {({ setData }) => (
              <button
                onClick={() =>
                  setData(
                    "New data set manually at " + new Date().toTimeString()
                  )
                }
              >
                Set data
              </button>
            )}
          </ConsumerRaw>
        </Provider>
      </section>
    );
  }
}
