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

const { Provider: Provider1, Consumer: Consumer1 } = LoadableContext({
  loader: async () => "Loaded context number 1."
});

const { Provider: Provider2, Consumer: Consumer2 } = LoadableContext({
  loader: async () => "Loaded context number 2."
});

const { Provider: Provider3, Consumer: Consumer3 } = LoadableContext({
  loader: async () => "Loaded context number 3."
});

export default class Example6Composition extends React.Component<Props> {
  render() {
    return (
      <section id="example6">
        <h2>Example 6: Composition</h2>
        <p>
          In this example we compose several loaders. See also{" "}
          <a
            target="_blank"
            href="https://github.com/jamesplease/react-composer"
          >
            react-composer
          </a>, which helps dealing with that.
        </p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`const { Provider: Provider1, Consumer: Consumer1 } = LoadableContext({
  loader: async () => "Loaded context number 1."
});

const { Provider: Provider2, Consumer: Consumer2 } = LoadableContext({
  loader: async () => "Loaded context number 2."
});

const { Provider: Provider3, Consumer: Consumer3 } = LoadableContext({
  loader: async () => "Loaded context number 3."
});

<Provider1>
  <Provider2>
    <Provider3>
      <Consumer1>{data => data}</Consumer1>
      <Consumer2>{data => data}</Consumer2>
      <Consumer3>{data => data}</Consumer3>
    </Provider3>
  </Provider2>
</Provider1>`}</SyntaxHighlighter>
        <h3>Result</h3>
        <Provider1>
          <Provider2>
            <Provider3>
              <Consumer1>{data => data}</Consumer1>
              <Consumer2>{data => data}</Consumer2>
              <Consumer3>{data => data}</Consumer3>
            </Provider3>
          </Provider2>
        </Provider1>
      </section>
    );
  }
}
