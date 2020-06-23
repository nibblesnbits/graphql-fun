import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserProtocol, queryMiddleware } from "farce";
import { createFarceRouter, createRender } from "found";
import { Resolver } from "found-relay";
import environment from "./relay-environment";
import routeConfig from "./routes";

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig,

  render: createRender({}),
});

ReactDOM.render(
  <React.StrictMode>
    <Router resolver={new Resolver(environment)} />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
