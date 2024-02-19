import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";
const db = getFirestore(app);

function Places() {
  const navigate = useNavigate();
  const [placeLists, setPlaceList] = useState([]);
  const [LetterWordLists, setLetterWordLists] = useState([]);

  useEffect(() => {
    // This code will run every time the component mounts or the page refreshes
    console.log("A Query was made");
    queryAll();
  }, []);

  useEffect(() => {
    // This code will run every time the component mounts or the page refreshes
    createLetterWordLists();
  }, [placeLists]);

  const routeChange = () => {
    const path = "/createplace";
    navigate(path);
  };

  const createLetterWordLists = () => {
    const internalWordLists = [];
    const internalUniqueFirstChars = [];
    const internalLetterWordLists = [];
    console.log("logged");

    //Populate internalWordLists
    for (let i = 0; i < placeLists.length; i++) {
      internalWordLists.push(placeLists[i].id);
    }

    //Populate internalUniqueFirstChars
    for (let i = 0; i < placeLists.length; i++) {
      if (internalUniqueFirstChars.includes(internalWordLists[i][0])) {
      } else {
        internalUniqueFirstChars.push(internalWordLists[i][0]);
      }
    }

    for (let i = 0; i < internalUniqueFirstChars.length; i++) {
      let subArray = [];
      subArray.push(internalUniqueFirstChars[i]);
      for (let i = 0; i < internalWordLists.length; i++) {
        if (subArray[0] === internalWordLists[i][0]) {
          subArray.push(internalWordLists[i]);
        }
      }
      internalLetterWordLists.push(subArray);
    }

    setLetterWordLists(internalLetterWordLists);
    //console.log(LetterWordLists);
  };

  const generateOutputList = () => {
    return LetterWordLists.map((innerArray, index) => (
      <div key={index} className="text-xl pt-10 flex flex-col">
        {innerArray.map((item, index) =>
          index === 0 ? (
            <div>
              <p key={index} className="text-3xl pb-3 pr-7 font-bold">
                {item}
              </p>
            </div>
          ) : (
            <div>
              <NavLink
                className="pr-4 text-white"
                key={index}
                to={"/editplace/" + item}
              >
                {item}
              </NavLink>
            </div>
          )
        )}
      </div>
    ));
  };

  const queryAll = async () => {
    const colRef = collection(db, "Places");
    const data = await getDocs(colRef);
    setPlaceList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold pt-14 pb-12 text-center">Place</h1>
      <button
        onClick={routeChange}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Create New
      </button>
      <div>{generateOutputList()}</div>
    </div>
  );
}

export default Places;
