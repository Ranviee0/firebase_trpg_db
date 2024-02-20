import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";
import DOMPurify from "dompurify";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

function EditPlace() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const { name } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const htmlString = marked.parse(text);
  const sanitizedHtml = DOMPurify.sanitize(htmlString);
  const navigate = useNavigate();

  useEffect(() => {
    queryPlace();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      queryPlace();
    }, 2000);
  }, [isEditing]);

  async function queryPlace() {
    const docRef = doc(db, "Places", name);
    const docSnap = await getDoc(docRef);
    setText(await docSnap.get("text"));
  }

  async function savePlace() {
    await setDoc(doc(db, "Places", name), {
      name: name,
      text: text,
      timestamp: serverTimestamp(),
    });
  }

  const handleSave = () => {
    setIsDeleting(false);
    savePlace();
    setTimeout(() => {
      queryPlace();
      setIsEditing(false);
    }, 500);
  };

  const handleEdit = () => {
    queryPlace();
    setTimeout(() => {
      setIsEditing(true);
    }, 500);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDeleteButton = () => {
    setIsDeleting(true);
  };

  const handleDeleteButton2 = () => {
    setIsDeleting(false);
  };

  const handleDeleteButton3 = () => {
    DeleteThisArticle();
    navigate("/");
  };

  const DeleteThisArticle = async () => {
    const docRef = doc(db, "Places", name);
    await deleteDoc(docRef);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="py-6">
        <div className="flex flex-row">
          <h3>{name}</h3>
          <button></button>
        </div>
        <div className="flex flex-col">
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
                <button
                  className="hover:text-red-700"
                  onClick={handleDeleteButton}
                >
                  Delete
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
          <div>
            {isDeleting ? (
              <div className="flex flex-row space-x-12">
                <p>Are you sure you want to delete this article?</p>
                <button
                  className="hover:text-red-700"
                  onClick={handleDeleteButton3}
                >
                  Yes
                </button>
                <button
                  className="hover:text-green-700"
                  onClick={handleDeleteButton2}
                >
                  No
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPlace;
