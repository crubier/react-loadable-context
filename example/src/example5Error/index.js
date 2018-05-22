/* @flow */

import * as React from "react";
import delay from "../../../src/utils/delay";
import LoadableContext from "react-loadable-context";
import Loading from "../../../src/loading/full";
// import Loading from "./loading";

import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/prism-light";
import jsx from "react-syntax-highlighter/languages/prism/jsx";
import { ghcolors as style } from "react-syntax-highlighter/styles/prism";

registerLanguage("jsx", jsx);

type Props = {};

const { Provider, ConsumerLoading } = LoadableContext({
  loader: async () => {
    await delay(3000);
    throw new Error("Not okay !");
  },
  loading: Loading,
  delay: 1000,
  timeOut: 2000
});

export default class Example3CodeSplitting extends React.Component<Props> {
  render() {
    return (
      <section id="example5">
        <h2>Example 5: Error</h2>
        <p>In this example, the promise throws an error.</p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`import Loading from "./loading";

const { Provider, Consumer:Consumer } = LoadableContext({
  loader: async () => {
    await delay(3000);
    throw new Error("Not okay !");
  },
  loading: Loading,
  delay: 1000,
  timeOut: 2000
});

<Provider>
  <ConsumerLoading>{thingToLoad => thingToLoad.theMessage}</ConsumerLoading>
</Provider>`}</SyntaxHighlighter>
        <h3>Result</h3>
        <Provider>
          <ConsumerLoading>{data => data}</ConsumerLoading>
        </Provider>
      </section>
    );
  }
}
