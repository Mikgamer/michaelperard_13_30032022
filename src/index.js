import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.scss"

import App from "./App"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"
import ErrorPage from "./pages/ErrorPage"

const container = document.getElementById("root"),
      root      = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<User />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
