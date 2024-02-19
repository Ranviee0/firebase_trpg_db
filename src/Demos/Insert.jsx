import React, { useState } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);

function Insert() {
  const [collection, setCollection] = useState("");
  const [name, setName] = useState("");

  const insertText = async () => {
    if (collection == "" || name == "") {
      alert("Please fill both text fields");
    } else {
      await checkNullAndInsert();
      setCollection("");
      setName("");
    }
  };

  async function checkNullAndInsert() {
    //fetch docRef
    const docRef = doc(db, collection, name);
    const docSnap = await getDoc(docRef);
    const arr = [];
    //push key in docSnap into the array
    for (const key in docSnap) {
      if (docSnap.hasOwnProperty(key)) {
        arr.push(docSnap[key]);
      }
    }
    //check if arr[3] is null
    if (arr[3] === null) {
      //If null then setDoc
      await setDoc(doc(db, collection, name), {
        name: name,
        timestamp: serverTimestamp(),
      });
      console.log(name);
    } else {
      console.log("Not Null");
    }
  }

  const handleCollectionChange = (event) => {
    const newCollection = event.target.value;
    setCollection(newCollection);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  return (
    <div>
      <h4>Insert</h4>
      <p>Collection</p>
      <input
        className="w-max text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white px-2.5 py-2.5"
        value={collection}
        onChange={handleCollectionChange}
      ></input>
      <p>Name</p>
      <input
        className="w-max text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white px-2.5 py-2.5"
        value={name}
        onChange={handleNameChange}
      ></input>
      <br></br>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={insertText}
      >
        Insert
      </button>
    </div>
  );
}

export default Insert;
