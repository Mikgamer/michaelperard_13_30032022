import "./Header.scss"
import Logo from "../img/argentBankLogo.png"
import { faCircleUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

const NotConnected = () => (
  <Link to="/login" className="main-nav-item" >
    <FontAwesomeIcon icon={faCircleUser} /> Sign In
  </Link>
)

const Connected = (props) => (
  <>
    <Link  to="/profile"className="main-nav-item">
      <FontAwesomeIcon icon={faCircleUser} /> {props.userName}
    </Link>
    <Link to="/" className="main-nav-item" onClick={props.logout}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out
    </Link>
  </>
)

export default function Header() {
  const { logged: isUserConnected, userData } = useSelector((state) => state),
        dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    dispatch({type: "LOGOUT"})
  }

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo" >
          <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>{isUserConnected ? <Connected userName={userData.firstName} logout={handleLogout} /> : <NotConnected />}</div>
      </nav>
    </header>
  )
}