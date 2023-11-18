'use client'
import { Timestamp, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import firebaseApp from "../config";

const db = getFirestore(firebaseApp)

export const addDataToFirebase = async (collectionName, data) => {
  let result = null;
  let error = null;

  try {
    const newCityRef = doc(collection(db, collectionName));

    result = await setDoc(newCityRef, { ...data, timestamp: Timestamp.now() }, {
      merge: true,
    });
    console.log(result)
  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}
