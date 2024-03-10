import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { skillData } from '../../component/text';

const TextEditor = ({ initialText, onTextChange }) => {
  const [editorState, setEditorState] = useState(initialText);
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
        className='textify lg:w-[750px] mb-4 md:w-[500px] sm:w-[300px]]'
      />
    </div>
  );
};

export default TextEditor;