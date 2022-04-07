import "./ErrorPage.scss"

export default function ErrorPage(props) {
  const message = props.error === 401 ? <><h1>Error 401</h1><h2>You must be logged in to access this page</h2></> :
                                        <><h1>Error 404</h1><h2>This page does not exist</h2></>

  return (
    <main className="errorPage">{message}</main>
  )
}