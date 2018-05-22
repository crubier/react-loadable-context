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
  loader: async () => await import("./thingToLoad")
});

export default class Example3CodeSplitting extends React.Component<Props> {
  render() {
    return (
      <section id="example3">
        <h2>Example 3: Code Splitting</h2>
        <p>
          In this example the loader loads an external chunk using code
          splitting, with the asynchronous import statement.
        </p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`const { Provider, Consumer } = LoadableContext({
  loader: async () => await import("./thingToLoad")
});

<Provider>
  <Consumer>{thingToLoad => thingToLoad.theMessage}</Consumer>
</Provider>`}</SyntaxHighlighter>

        <SyntaxHighlighter language="jsx" style={style}>{`// thingToLoad.js
  
export const theMessage =
  "Loaded asynchronously using code splitting from another file.";`}</SyntaxHighlighter>

        <h3>Result</h3>
        <Provider>
          <Consumer>{thingToLoad => thingToLoad.theMessage}</Consumer>
        </Provider>
      </section>
    );
  }
}
