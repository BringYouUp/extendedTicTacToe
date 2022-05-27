import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import './styles/root.sass'

// const React = require("react");
// const ReactDOM = require("react-dom");
// const App = require("./App.jsx");

ReactDOM.render(<App />, document.getElementById("root"));

const isDevelopment = process.env.NODE_ENV === 'development'

if (isDevelopment && module && module.hot)
	module.hot.accept()
