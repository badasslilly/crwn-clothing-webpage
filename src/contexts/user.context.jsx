import { createContext, useState,useEffect } from "react";
import { unstable_HistoryRouter } from "react-router-dom";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../routes/utils/firebase/firebase.utils";

// as the actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    const unsubscribe =  onAuthStateChangedListener((user)=> {
      if(user){
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return (
  <UserContext.Provider value={value}>
    { children }
  </UserContext.Provider>
  )
}