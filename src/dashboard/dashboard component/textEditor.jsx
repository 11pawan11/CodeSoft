import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { skillData } from '../../component/text';

const TextEditor = ({ initialText, onTextChange }) => {
  // console.log("first", initialText)

    // Update editorState whenever initialText changes
    useEffect(() => {
      setEditorState(initialText);
    }, [initialText]);


  const handleEditorChange = (content, delta, source, editor) => {
    setEditorState(content);
    onTextChange(content); // Notify parent component about text change
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorState}
        onChange={handleEditorChange}
        className='w-full mb-4'
      />
    </div>
  );
};

export default TextEditor;