import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Provider } from 'react-redux'
import { userStore } from './redux/userStore'

export default function App() {
  return (
    <Provider store={userStore}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  )
}