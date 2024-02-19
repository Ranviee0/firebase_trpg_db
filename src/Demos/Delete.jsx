import React, { useState } from "react";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);

function Delete() {
  const [collection, setCollection] = useState("");
  const [name, setName] = useState("");

  const handleCollectionChange = (event) => {
    const newCollection = event.target.value;
    setCollection(newCollection);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const checkIfOccupiedAndDelete = async () => {
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
      console.log("arr[3] is null, can't delete");
    } else {
      console.log("arr[3] is occupied, deleting completed");
      //delete document accoring to the docRef
      const docRef = doc(db, collection, name);
      await deleteDoc(docRef);
    }
  };

  return (
    <div>
      <h4>Delete</h4>
      <p>Collection</p>
      <textarea
        className="w-max text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        onChange={handleCollectionChange}
      ></textarea>
      <p>Name</p>
      <textarea
        className="w-max text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        onChange={handleNameChange}
      ></textarea>
      <div>
        <br></br>
        <button
          onClick={checkIfOccupiedAndDelete}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Delete;
