import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";
const db = getFirestore(app);

function Item() {
  const navigate = useNavigate();
  const [itemLists, setItemList] = useState([]);
  const [LetterWordLists, setLetterWordLists] = useState([]);

  useEffect(() => {
    // This code will run every time the component mounts or the page refreshes
    console.log("A Query was made");
    queryAll();
  }, []);

  useEffect(() => {
    // This code will run every time the component mounts or the page refreshes
    createLetterWordLists();
  }, [itemLists]);

  const routeChange = () => {
    const path = "/createitem";
    navigate(path);
  };

  const createLetterWordLists = () => {
    const internalWordLists = [];
    const internalUniqueFirstChars = [];
    const internalLetterWordLists = [];
    console.log("logged");

    //Populate internalWordLists
    for (let i = 0; i < itemLists.length; i++) {
      internalWordLists.push(itemLists[i].id);
    }

    //Populate internalUniqueFirstChars
    for (let i = 0; i < itemLists.length; i++) {
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
      <div key={index} className="text-xl pt-10 flex flex-col ">
        {innerArray.map((item, index) =>
          index === 0 ? (
            <div>
              <p key={index} className="text-3xl pb-3 pr-7 font-bold \">
                {item}
              </p>
            </div>
          ) : (
            <div>
              <NavLink
                className="pr-4 text-white"
                key={index}
                to={"/edititem/" + item}
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
    const colRef = collection(db, "Items");
    const data = await getDocs(colRef);
    setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold pt-14 pb-12 text-center">Item</h1>
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

export default Item;
