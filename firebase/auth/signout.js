import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../config";

const auth = getAuth(firebaseApp);

export default async function signoutHandler() {
  await signOut(auth);
  window.open('/', '_self');
}