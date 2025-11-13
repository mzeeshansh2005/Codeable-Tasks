import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "./firebase"

export const signup = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const signupWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  return userCredential.user
}
