import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "demo/styles/index.less";

const rootEl = document.getElementById("root");

const render = Component => ReactDOM.render(<Component />, rootEl);

render(App);
if (module.hot) module.hot.accept();
