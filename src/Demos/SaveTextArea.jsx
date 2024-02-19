import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const SaveTextArea = () => {
  // State to store the content of the textarea
  const [textareaContent, setTextareaContent] = useState("");

  // State to store the saved content
  const [savedContent, setSavedContent] = useState("");

  const htmlString = marked.parse(savedContent);
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  // Function to handle changes in the textarea
  const handleTextareaChange = (event) => {
    setTextareaContent(event.target.value);
  };

  // Function to handle the "Save" button click
  const handleSaveClick = () => {
    // Save the content to the variable
    setSavedContent(textareaContent);
  };

  return (
    <div>
      <h4>SaveTextArea</h4>
      <textarea
        value={textareaContent}
        onChange={handleTextareaChange}
        placeholder="Enter text here..."
        className="w-max text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
      />
      <br></br>
      <button
        onClick={handleSaveClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Save
      </button>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
};

export default SaveTextArea;
