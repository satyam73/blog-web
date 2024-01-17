'use client'
import { Timestamp, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import firebaseApp from "../config";

const db = getFirestore(firebaseApp);

export const addDataToFirebase = async (collectionName, data) => {
  let result = null;
  let error = null;

  try {
    const docRef = doc(collection(db, collectionName));

    await setDoc(docRef, { id: docRef.id, ...data, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });

    result = (await getDoc(docRef)).data();
  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}

export const updateDataOfFirebase = async (id, collectionName, dataToUpdate) => {
  let result = null;
  let error = null;
  try {
    const docRef = doc(db, collectionName, id)

    await updateDoc(docRef, {
      updatedAt: Timestamp.now(),
      ...dataToUpdate
    });

    result = (await getDoc(docRef)).data();
  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}


export const getDataById = async (id, collectionName) => {
  let result = null;
  let error = null;
  try {
    const docRef = doc(db, collectionName, id)

    result = (await getDoc(docRef)).data();
  } catch (e) {
    error = e;
  }

  console.log()
  return { result, error };
}