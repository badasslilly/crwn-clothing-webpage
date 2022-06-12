import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword} from 'firebase/auth'
import {
  getFirestore, 
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEshzX8hCNsuafsjrRihQ8qFxcDOX0dhs",
  authDomain: "crwn-clothing-db-c0ccd.firebaseapp.com",
  projectId: "crwn-clothing-db-c0ccd",
  storageBucket: "crwn-clothing-db-c0ccd.appspot.com",
  messagingSenderId: "158745210580",
  appId: "1:158745210580:web:3441b53288a81345131541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth,provider)

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return

const userDocRef = doc(db, 'users', userAuth.uid)
console.log(userDocRef);

const userSnapshot = await getDoc(userDocRef)

if(!userSnapshot.exists()) {
  const { displayName, email } = userAuth
  const createdAt = new Date()

  try {
    await setDoc(
      userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      }) 
  } catch (error) {
    console.log('error creating the user', error.message);
  }
}
return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}
