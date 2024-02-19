import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);

function GetAll() {
  const [colLists, setColList] = useState([]);
  const [col, setCol] = useState("");

  const queryAll = async () => {
    if (col == "") {
      alert("Please fill text the field");
    } else {
      const colRef = collection(db, col);
      const data = await getDocs(colRef);
      setColList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs);
      setCol("");
    }
  };

  const handleColChange = (event) => {
    const newCol = event.target.value;
    setCol(newCol);
  };

  return (
    <div>
      <h4>GetAll</h4>
      <p>Collection</p>
      <input
        className="w-max text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white px-2.5 py-2.5"
        value={col}
        onChange={handleColChange}
      ></input>
      <div>
        {colLists.map((doc, index) => {
          return (
            <div key={index}>
              <p>{doc.name}</p>
            </div>
          );
        })}
      </div>
      <br></br>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={queryAll}
      >
        Update
      </button>
    </div>
  );
}

export default GetAll;
