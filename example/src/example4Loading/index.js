/* @flow */

import * as React from "react";
import delay from "../../../src/utils/delay";
import LoadableContext from "react-loadable-context";
import Loading from "./loading";

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
    return "Loaded after a delay and detailed info.";
  },
  loading: Loading,
  delay: 1000,
  timeOut: 2000
});

export default class Example3CodeSplitting extends React.Component<Props> {
  render() {
    return (
      <section id="example4">
        <h2>Example 4: Loading placeholders</h2>
        <p>
          In this example we use a loading placeholder component to keep the
          user informed about what is going on.
        </p>
        <h3>Code</h3>
        <SyntaxHighlighter
          language="jsx"
          style={style}
        >{`import Loading from "./loading";

const { Provider, Consumer:Consumer } = LoadableContext({
  loader: async () => {
    await delay(3000);
    return "Loaded after a delay and detailed info.";
  },
  loading: Loading,
  delay: 1000,
  timeOut: 2000
});

<Provider>
  <ConsumerLoading>{thingToLoad => thingToLoad.theMessage}</ConsumerLoading>
</Provider>`}</SyntaxHighlighter>
        <SyntaxHighlighter language="jsx" style={style}>{`// loading.js

import * as React from "react";

type Props = {
  retry?: mixed => mixed,
  loading?: boolean,
  error?: mixed,
  timedOut?: boolean,
  pastDelay?: boolean
};

export default function Loading(props: Props) {
  if (props.loading) {
    if (props.timedOut) {
      return (
        <div>
          Loader timed out!
          <button onClick={props.retry}>Retry loading</button>
        </div>
      );
    } else if (props.pastDelay) {
      return (
        <div>
          Loading is taking some time (display some activity indicator here)
        </div>
      );
    } else {
      return (
        <div>
          Before delay (display some placeholder or skeleton component here)
        </div>
      );
    }
  } else if (props.error !== null && props.error !== undefined) {
    return (
      <div>
        {props.error.toString()}
        <button onClick={props.retry}>Retry loading</button>
      </div>
    );
  } else {
    throw new Error(
      "This should not happen, but react loadable context sent wrong props to loading component"
    );
  }
}`}</SyntaxHighlighter>
        <h3>Result</h3>
        <Provider>
          <ConsumerLoading>{data => data}</ConsumerLoading>
        </Provider>
      </section>
    );
  }
}
