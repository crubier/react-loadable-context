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
  loader: async props => {
    await delay(props.delay);
    return props.resultToShow;
  }
});

export default class Example9PropsToLoader extends React.Component<Props> {
  render() {
    return (
      <section id="example9">
        <h2>Example 9: Props to loader</h2>
        <p>In this example the loader uses props sent to the provider.</p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`const { Provider, Consumer, ConsumerRaw } = LoadableContext({
  loader: async props => {
    await delay(props.delay);
    return props.resultToShow;
  }
});

<Provider delay={5000} resultToShow="Hey">
  <Consumer>{data => data}</Consumer>
</Provider>`}</SyntaxHighlighter>
        <h3>Result</h3>
        <Provider delay={5000} resultToShow="Hey">
          <Consumer>{data => data}</Consumer>
        </Provider>
      </section>
    );
  }
}
