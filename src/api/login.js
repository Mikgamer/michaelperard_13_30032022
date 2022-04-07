export const login = (email, password) => fetch(process.env.REACT_APP_BACKEND_API + "user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify( { email, password } )
})
  .then(response => response.json())
  .then(data => {
    return data
  })

export const getData = (token) => fetch(process.env.REACT_APP_BACKEND_API + "user/profile", {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + token
  }
})
.then(response => response.json())
.then(data => {
  return data
})

export const editProfile = (firstName, lastName, token) => fetch(process.env.REACT_APP_BACKEND_API + "user/profile", {
  method: "PUT",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  },
  body: JSON.stringify( { firstName, lastName } )
})