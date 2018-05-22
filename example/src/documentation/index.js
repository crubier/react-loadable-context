/* @flow */

import * as React from "react";

type Props = {};

export default class Doc extends React.Component<Props> {
  render() {
    return (
      <section>
        <p>
          A component to asynchronously load any object into the react context,
          for example when using{" "}
          <a
            target="_blank"
            href="https://webpack.js.org/guides/code-splitting/"
          >
            Code Splitting
          </a>.
        </p>
        <p>
          Just like{" "}
          <a target="_blank" href="https://reactjs.org/docs/context.html">
            the new context API
          </a>, this function returns:
        </p>
        <ul>
          <li>
            A <code>Provider</code>, which injects the loaded object into the
            context as soon as the promise is resolved
          </li>
          <li>
            Various <code>Consumer</code> components, which gracefully handle
            loading and error states.
          </li>
        </ul>

        <p>
          This is particularly usefull when creating libraries which interface
          react with third party heavy libraries, such as Cesium, vis.js,
          openlayers and others. The main "wrapper" component for the library
          uses the <code>Provider</code>. The various "elements" of the library
          use the <code>Consumer</code>.
        </p>
        <p>
          Losely inspired by{" "}
          <a
            target="_blank"
            href="https://github.com/jamiebuilds/react-loadable"
          >
            react-loadable
          </a>{" "}
          and{" "}
          <a target="_blank" href="https://reactjs.org/docs/context.html">
            the new context API
          </a>
        </p>

        <h2>Features</h2>
        <ul>
          <li>Fully compliant with the official React context API</li>
          <li>Super lightweight</li>
          <li>
            Simple API: <a href="#example1">Example 1</a>
          </li>
          <li>
            Promise-based asynchronous loading:{" "}
            <a href="#example2">Example 2</a>
          </li>
          <li>
            Code splitting: <a href="#example3">Example 3</a>
          </li>
          <li>
            Custom loading placeholders, activity indicators and retry button:{" "}
            <a href="#example4">Example 4</a>
          </li>
          <li>
            Error handling: <a href="#example5">Example 5</a>
          </li>
          <li>
            Nested, composable contexts: <a href="#example6">Example 6</a>
          </li>
          <li>
            Fully customizable rendering: <a href="#example7">Example 7</a>
          </li>
        </ul>

        <h2>Links</h2>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://github.com/crubier/react-loadable-context"
            >
              Sources on github
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.npmjs.com/package/react-loadable-context"
            >
              NPM page
            </a>
          </li>
        </ul>
      </section>
    );
  }
}
