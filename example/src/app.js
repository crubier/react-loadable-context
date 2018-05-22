/* @flow */

import * as React from "react";

import Documentation from "./documentation";
import Example1 from "./example1Simple";
import Example2 from "./example2Delay";
import Example3 from "./example3CodeSplitting";
import Example4 from "./example4Loading";
import Example5 from "./example5Error";
import Example6 from "./example6Composition";
import Example7 from "./example7ConsumerRaw";

type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return (
      <section>
        <h1>React-Loadable-Context</h1>
        <Documentation />
        <Example1 />
        <Example2 />
        <Example3 />
        <Example4 />
        <Example5 />
        <Example6 />
        <Example7 />
      </section>
    );
  }
}
