import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "./firebase"

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  return userCredential.user
}

