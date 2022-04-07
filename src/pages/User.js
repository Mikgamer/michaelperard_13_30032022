import "./User.scss"
import { useForm } from "react-hook-form"
import { editProfile } from "../api/login"
import { useSelector, useDispatch } from 'react-redux'
import { userStore } from "../redux/userStore"
import { saveState } from "../redux/storage"

const HeaderMessage = (props) => {
  const dispatch = useDispatch()

  return (
    <>
      <h1>Welcome back<br/>{props.username}</h1>
      <button className="edit-button" onClick={() => dispatch({type: "PROFILE_EDIT"})}>Edit Name</button>
    </>
  )
}

const EditingHeader = (props) => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const saveCurrentState = () => saveState(userStore.getState(), props.storage)
  
  const onSubmit = async data => {
    try {
      const edit = await editProfile(data.firstName, data.lastName, props.token)
      if (edit.status === 200) {
        dispatch({type: "PROFILE_UPDATE", firstName: data.firstName, lastName: data.lastName})
        dispatch({type: "PROFILE_CLOSE_EDIT"})
        saveCurrentState()
      } else {
        // Show error under submit button
        console.log(edit.message)
      }
    } catch (error) {}
  }

  return (
    <>
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-center">
        <div className="input-wrapper flex-right">
          <input type="text" {...register("firstName", { required: true })}/>
          <button className="edit-button" type="submit">Save</button>
        </div>
        <div className="input-wrapper flex-left">
          <input type="text" {...register("lastName", { required: true })}/>
          <button className="edit-button" type="button" onClick={() => dispatch({type: "PROFILE_CLOSE_EDIT"})}>Cancel</button>
        </div>
      </form>
    </>
  )
}

export default function User() {
  const { logged: isUserConnected = false, userData, token, isEditingProfile, storage } = useSelector((state) => state)

  if (!isUserConnected) return <>You must be logged in to access this page</>

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditingProfile ? 
          <EditingHeader storage={storage} token={token}/> :
          <HeaderMessage username={userData.firstName+" "+userData.lastName} />
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