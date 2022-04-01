import "./SignIn.scss"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form"

export default function SignIn() {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />
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
        </form>
      </section>
    </main>
  )
}