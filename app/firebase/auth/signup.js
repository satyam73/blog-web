import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebaseApp from "../config";
import { createUserWithEmailAndPassword, getAuth, updateProfile, sendEmailVerification } from "firebase/auth";
import { DOMAIN } from "@/config";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default async function signUp(name, email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const actionCodeSettings = {
      url: `${DOMAIN}/?email=${user.email}`
    }

    await sendEmailVerification(user, actionCodeSettings);
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email: user.email,
      id: user.uid,
      createdAt: user.metadata.createdAt,
      updatedAt: user.metadata.createdAt,
      bio: null,
      profilePic: null,
    });

    updateProfile(user, { displayName: name, photoURL: null });

  } catch (e) {
    error = e;
  }

  return { result, error };
}
