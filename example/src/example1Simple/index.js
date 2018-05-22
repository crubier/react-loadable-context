/* @flow */

import * as React from "react";
import LoadableContext from "react-loadable-context";

import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/prism-light";
import jsx from "react-syntax-highlighter/languages/prism/jsx";
import { ghcolors as style } from "react-syntax-highlighter/styles/prism";

registerLanguage("jsx", jsx);

type Props = {};

const { Provider, Consumer } = LoadableContext({
  loader: () => "Loaded simply."
});

export default class Example1Simple extends React.Component<Props> {
  render() {
    return (
      <section id="example1">
        <h2>Example 1: Simple</h2>
        <p>In this example the loader resolves a promise immediately. </p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`const { Provider, Consumer } = LoadableContext({
  loader: () => "Loaded simply."
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
