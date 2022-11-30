import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import '@/styles/root.sass'

ReactDOM.render(<App />, document.getElementById("root"));

const isDevelopment = process.env.NODE_ENV === 'development'

if (isDevelopment && module && module.hot)
	module.hot.accept()
