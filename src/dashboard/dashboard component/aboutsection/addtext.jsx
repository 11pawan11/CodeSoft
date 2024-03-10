import { useState, useEffect } from "react";
import TextEditor from "../textEditor";
import { doc, getFirestore, updateDoc, getDoc } from "firebase/firestore";
import { useImage } from "../../../component/conext api/imageContext";
import { useToaster } from "../../../component/conext api/toast";
import { AboutMy } from "../../../component/text";

const AddText = () => {
  const [updateText, setUpdatedText] = useState("");
  const { handleTextContext } = useImage();
  const {showToast} = useToaster();

  const updateTextInFirebase = async (text) =>  {
    try {
      // Remove HTML tags from the text
      const strippedText = text.replace(/<[^>]+>/g, '');
  
      const database = getFirestore();
      const aboutRefText = doc(database, "about", "aboutText");
      await updateDoc(aboutRefText, { text: strippedText });
      showToast("Text Updated Sucessfully", "", "green")
      handleTextContext(strippedText);
    } catch(error) {
      showToast(error, "", "red");
    }
  };

  const fetchTextFromFirebase = async () => {
    try {
      const database = getFirestore();
      const aboutDoc = await getDoc(doc(database, "about", "aboutText"));
      if (aboutDoc.exists()) {
        setUpdatedText(aboutDoc.data().text || ""); // Set the initial value of updatedText
      }
    } catch (error) {
      console.error("Error fetching text:", error);
    }
  };

  useEffect(() => {
    fetchTextFromFirebase();
  }, []);

  return (
    <div className="gap-4">
      <div className="">
        <TextEditor 
          initialText={updateText} 
          onTextChange={setUpdatedText}
        />
      </div>
      <div className="text-center lg:ml-[45px] updates md:ml-0">  
        <button 
          className="p-2 bg-gray-700 rounded text-white" 
          onClick={() => updateTextInFirebase(updateText)}
        >
          Update now
        </button>
      </div>
    </div>
  );
};

export default AddText;
