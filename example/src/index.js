/* @flow */
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(<App />, document.getElementById("app"));

if (process.env.MODE === "development") {
  module.hot.accept();
}
