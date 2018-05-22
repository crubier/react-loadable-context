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

const { Provider, Consumer } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Loaded after a delay.";
  }
});

export default class Example2Delay extends React.Component<Props> {
  render() {
    return (
      <section id="example2">
        <h2>Example 2: Delay</h2>
        <p>In this example the loader resolves a promise after a delay.</p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`const { Provider, Consumer } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Loaded after a delay.";
  }
});

<Provider>
  <Consumer>{data => data}</Consumer>
</Provider>`}</SyntaxHighlighter>
        <h3>Result</h3>
        <Provider>
          <Consumer>{data => data}</Consumer>
        </Provider>
      </section>
    );
  }
}
