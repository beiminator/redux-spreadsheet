import React from "react";
import ReactDOM from "react-dom";
import WorkArea from "./components/work-area";
import { Provider } from "react-redux";
import store from "./model/store";

ReactDOM.render(
  <Provider store={store}>
    <WorkArea />
  </Provider>,
  document.getElementById("root")
);
