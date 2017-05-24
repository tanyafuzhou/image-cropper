import React, { PropTypes } from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Cropper from "./pages/Cropper";
import Layout from "./Layout";
function App() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Cropper} />
      </Route>
    </Router>
  );
}

export default App;
