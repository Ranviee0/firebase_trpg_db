import { React, useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);

function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const htmlString = marked.parse(text);
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  async function queryHomeArticle() {
    const docRef = doc(db, "Home", "startPage");
    const docSnap = await getDoc(docRef);
    setText(await docSnap.get("text"));
  }

  useEffect(() => {
    setTimeout(() => {
      queryHomeArticle();
    }, 2000);
  }, [isEditing]);

  useEffect(() => {
    async function checking() {
      if ((await checkExistence()) == true) {
        console.log("startPage already exists");
        queryHomeArticle();
      } else {
        console.log("need to create a startPage");
        createHomeArticle();
        queryHomeArticle();
        console.log("startpage created");
      }
    }
    checking();
  }, []);

  const checkExistence = async () => {
    const docRef = doc(db, "Home", "startPage");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  async function saveCharacter() {
    await setDoc(doc(db, "Home", "startPage"), {
      text: text,
      timestamp: serverTimestamp(),
    });
  }

  const handleSave = () => {
    saveCharacter();
    setTimeout(() => {
      queryHomeArticle();
      setIsEditing(false);
    }, 500);
  };

  const handleEdit = () => {
    queryHomeArticle();
    setTimeout(() => {
      setIsEditing(true);
    }, 500);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const createHomeArticle = async () => {
    await setDoc(doc(db, "Home", "startPage"), {
      text: "",
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div>
        <div>
          {isEditing ? (
            <textarea
              className="w-[1024px] h-[800px] bg-slate-700"
              value={text}
              onChange={handleChange}
              rows={4}
              cols={50}
            />
          ) : (
            <div
              className="w-[900px]"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          )}
        </div>
        <div className="py-5">
          {isEditing ? (
            <div className="space-x-12">
              <button className="hover:text-blue-700" onClick={handleSave}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <button className="hover:text-blue-700" onClick={handleEdit}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
