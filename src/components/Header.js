import "./Header.scss"
import Logo from "../img/argentBankLogo.png"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo" >
          <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/login" className="main-nav-item" >
              <FontAwesomeIcon icon={faCircleUser} /> Sign In
          </Link>
        </div>
      </nav>
    </header>
  )
}