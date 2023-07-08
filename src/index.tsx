import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";

import '@/styles/root.sass'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const isDevelopment = process.env.NODE_ENV === 'development'

if (isDevelopment && module && module.hot)
	module.hot.accept()
