import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);

function CreateCharacter() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [charName, setCharName] = useState("");

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleCharNameChange = (event) => {
    const newName = event.target.value;
    setCharName(newName);
  };

  const Insert = async () => {
    if (checked == true && charName !== "") {
      console.log("The input is valid.");
      if ((await checkDuplicateName()) == true) {
        alert("The character already exists.");
      } else {
        await setDoc(doc(db, "Characters", charName), {
          name: charName,
          text: "",
          timestamp: serverTimestamp(),
        });
        navigate("/characters");
        console.log(charName + " has been inserted.");
      }
    } else {
      alert("Please both fill in character name and check the box.");
    }
  };

  const checkDuplicateName = async () => {
    const docRef = doc(db, "Characters", charName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("The character exists.");
      return true;
    } else {
      console.log("The character doesn't exist.");
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h5 className="pt-8 pb-8">Insert character name:</h5>
      <div>
        <input
          type="text"
          className="w-max text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Name"
          value={charName}
          onChange={handleCharNameChange}
        ></input>
      </div>
      <div className="flex flex-row pt-10 pb-5 items-center">
        <div className="px-5">
          <input
            type="checkbox"
            id="agreement"
            value={checked}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="agreement">
            {" "}
            I agree that the name cannot be changed unless <br></br>
            the character has been deleted and created again.
          </label>
        </div>
      </div>
      <div className="pt-8">
        <button
          onClick={Insert}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Insert
        </button>
      </div>
    </div>
  );
}

export default CreateCharacter;
