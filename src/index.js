import React from "react"
import ReactDOM from "react-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom"

import App from "./App.js"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
