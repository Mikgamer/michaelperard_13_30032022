import "./SignIn.scss"
import { ReactComponent as UserCircle } from "../img/user-circle.svg"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { login, getData } from "../api/login"
import { useDispatch } from 'react-redux'
import { userStore } from "../redux/userStore"
import { saveState } from "../redux/storage"
import { useState } from "react"

export default function SignIn() {
  const { register, handleSubmit } = useForm(),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async data => {
    const storageName = data["remember-me"] ? "localStorage" : "sessionStorage",
          storageType = data["remember-me"] ? localStorage : sessionStorage
    const saveCurrentState = () => saveState(userStore.getState(), storageType)

    try {
      const loginData = await login(data.username, data.password)

      if (loginData.status === 200) {
        const userData  = await getData(loginData.body.token)
              
        dispatch({type: "LOGIN_VALID", userData: userData.body, token: loginData.body.token})
        dispatch({type: "SAVE_STORAGE", storage: storageName})
        saveCurrentState()
        navigate("/profile")
      } else {
        setErrorMessage(loginData.message)
      }      
    } catch (error) {
      setErrorMessage("Error with server")
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <UserCircle className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" autoComplete="username" {...register("username", { required: "This input is required" })} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" autoComplete="current-password" {...register("password", { required: true })} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" {...register("remember-me")} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
          <div className="errorMessage">{errorMessage}</div>
        </form>
      </section>
    </main>
  )
}