'use client'
import { Timestamp, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
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
  return { result, error };
}

export async function getAllDocs(collectionName, queryData) {
  let result = null;
  let error = null;
  try {
    let dataFromDB;
    result = [];
    for (let [key, value] of Object.entries(queryData)) {
      if (key && value) {
        dataFromDB = query(collection(db, collectionName), where(key, "==", value));
      }
    }
    const querySnapshot = await getDocs(dataFromDB);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      result.push(doc.data())
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}