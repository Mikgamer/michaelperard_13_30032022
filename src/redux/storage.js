// Load state from sessionStorage or localStorage, else return an empty Object
export const loadState = () => {
  if (sessionStorage.getItem("state") !== null) return JSON.parse(sessionStorage.getItem("state"))
  if (  localStorage.getItem("state") !== null) return JSON.parse(  localStorage.getItem("state"))
  return {}
}

// Save state from a given storage
export const saveState = (state, storage) => {
  try {
    storage.setItem("state", JSON.stringify(state))
  } catch (error) {}
}