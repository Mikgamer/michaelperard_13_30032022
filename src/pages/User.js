import "./User.scss"
import { useForm } from "react-hook-form"
import { editProfile } from "../api/login"
import { useSelector, useDispatch } from 'react-redux'
import { userStore } from "../redux/userStore"
import { saveState } from "../redux/storage"
import ErrorPage from "./ErrorPage"
import { useState } from "react"

const HeaderMessage = (props) => {
  return (
    <>
      <h1>Welcome back<br/>{props.username}</h1>
      <button className="edit-button" onClick={ () => props.openEdit() }>Edit Name</button>
    </>
  )
}

const EditingHeader = (props) => {
  const { register, handleSubmit } = useForm(),
        dispatch = useDispatch(),
        saveCurrentState = () => saveState(userStore.getState(), props.storage),
        [errorMessage, setErrorMessage] = useState("")
  
  const onSubmit = async data => {
    try {
      const edit = await editProfile(data.firstName, data.lastName, props.token)
      if (edit.status === 200) {
        dispatch({type: "PROFILE_UPDATE", firstName: data.firstName, lastName: data.lastName})
        props.closeEdit()
        setErrorMessage("")
        saveCurrentState()
      } else {
        setErrorMessage(edit.message)
      }
    } catch (error) {
      setErrorMessage("Error with server")
    }
  }

  return (
    <>
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-center">
        <div className="input-wrapper flex-right">
          <input type="text" placeholder={props.userData.firstName} {...register("firstName", { required: true })}/>
          <button className="edit-button" type="submit">Save</button>
        </div>
        <div className="input-wrapper flex-left">
          <input type="text" placeholder={props.userData.lastName} {...register("lastName", { required: true })}/>
          <button className="edit-button" type="button" onClick={ () => props.closeEdit() }>Cancel</button>
        </div>
      </form>
      <div className="errorMessage">{errorMessage}</div>
    </>
  )
}

export default function User() {
  const { logged: isUserConnected = false, userData, token, storage } = useSelector((state) => state),
        [isEditingProfile, setIsEditingProfile] = useState(false)

  const openEdit  = () => { setIsEditingProfile(true)  },
        closeEdit = () => { setIsEditingProfile(false) }

  if (!isUserConnected) return <ErrorPage error={401}/>

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditingProfile ? 
          <EditingHeader storage={storage} token={token} userData={userData} closeEdit={closeEdit} /> :
          <HeaderMessage username={userData.firstName+" "+userData.lastName} openEdit={openEdit} />
        }
      </div>
      <h2 className="sr-only">Accounts</h2>

      {/* Example Data */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      
    </main>
  )
}