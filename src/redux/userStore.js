import { createStore } from 'redux'
import { loadState } from './storage'

// Actions type
const LOGIN_VALID         = "LOGIN_VALID",
      LOGIN_ERROR         = "LOGIN_ERROR",
      LOGOUT              = "LOGOUT",
      SAVE_STORAGE        = "SAVE_STORAGE",
      PROFILE_EDIT        = "PROFILE_EDIT",
      PROFILE_CLOSE_EDIT  = "PROFILE_CLOSE_EDIT",
      PROFILE_UPDATE      = "PROFILE_UPDATE"

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_VALID:
      return {
        logged: true,
        userData: action.userData,
        token: action.token
      }
    case LOGIN_ERROR:
      return {}
    case LOGOUT:
      return {}
    case SAVE_STORAGE:
      return {
        ...state,
        storage: action.storage
      }
    case PROFILE_EDIT:
      return {
        ...state,
        isEditingProfile: true
      }
    case PROFILE_CLOSE_EDIT:
      return {
        ...state,
        isEditingProfile: false
      }
    case PROFILE_UPDATE:
      return {
        ...state,
        userData: {
          ...state.userData,
          firstName: action.firstName,
          lastName: action.lastName
        }
      }
    default:
      return state
  }
}

// Store
export const userStore = createStore(userReducer, loadState())