import { createContext, useState, useContext, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ImageContext = createContext();

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext should be within the Image Provider");
  }
  return context;
};

export const ImageProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState("");
  // const [lastUpdated, setLastUpdated] = useState(null);
  const [textUpdate, setTextUpdate] = useState("");
  const [textSkill, setTextSkill] = useState([]);
  const [experienceUpdate, setExperienceUpdate]= useState([]);
  const [educationUpdate, setEducationUpdate]= useState([]);

  useEffect(() => {
    const fetchTextFromFirebase = async () => {
      try {
        const database = getFirestore();
        const aboutDoc = await getDoc(doc(database, "about", "aboutText"));
        if (aboutDoc.exists()) {
          const newTextUpdate = aboutDoc.data().text || "";
          if (newTextUpdate !== textUpdate) {
            setTextUpdate(newTextUpdate);
          }
        }
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchTextFromFirebase();
  }, []);

  //for image update in about section
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const database = getFirestore();
        const aboutRef = doc(database, "about", "aboutImage");
        const snapshot = await getDoc(aboutRef);
        const data = snapshot.data();
        if (data && data.imageUrl) {
          // Check if the backend data has changed
          // if (data.lastUpdated !== lastUpdated) {
          setImageUrl(data.imageUrl);
          // setLastUpdated(data.lastUpdated);
          // }
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  // //for skill section
  // useEffect(() => {
  //   const fetchSkillFromDatabase = async() => {
  //     try
  //     {
  //         const database = getFirestore();
  //         const aboutSkillDoc = await getDoc(doc(database, "about", "aboutSkillText"));

  //         if (aboutSkillDoc.exists()) {
  //           const skillTexts = aboutSkillDoc.data().skillText || [];
  //           if (skillTexts!== textSkill) {
  //             setTextSkill(skillTexts);
  //           }
  //     }
  //   }
  //     catch(error)    
  //     {
  //         showToast(`Error during fetching ${error}`, "", "red");
  //     }

  // };

  // fetchSkillFromDatabase();
  // }, []);
  // console.log("Context update", textSkill);


  useEffect(() => {
    const fetchCategoriesFromFirebase = async () => {
        try {
            const database = getFirestore();
            const categoryRef = doc(database, "categories", "allCategories");
            const categoryDoc = await getDoc(categoryRef);
            if (categoryDoc.exists()) {
                setTextSkill(categoryDoc.data().categories || []);
            }
        } catch (error) {
            console.error("Error fetching categories from Firebase:", error);
        }
    };

    fetchCategoriesFromFirebase();
}, []);

//add experience section

useEffect(()=>{
  const fetchCategoriesFromFirebase = async () => {
    try {
      const database = getFirestore();
      const categoryRef = doc(database, "experience", "allExperience");
      const categoryDoc = await getDoc(categoryRef);
      if (categoryDoc.exists()) {
        setExperienceUpdate(categoryDoc.data().categories || []);
      }
    } catch (error) {
      console.error("Error fetching categories from Firebase:", error);
    }
  };

  fetchCategoriesFromFirebase();
},[]);

//add education section
useEffect (()=>{
  const fetchEducationFromFirebase = async () => {
    try {
      const database = getFirestore();
      const categoryRef = doc(database, "education", "allEducation");
      const categoryDoc = await getDoc(categoryRef);
      if (categoryDoc.exists()) {
        setEducationUpdate(categoryDoc.data().categories || []);
      }
    } catch (error) {
      console.error("Error fetching categories from Firebase:", error);
    }
  };

  fetchEducationFromFirebase();
},[]);


  const updateImageUrl = (url) => {
    setImageUrl(url);
  };
  // console.log("url",imageUrl)

  const handleTextContext = (text) => {
    setTextUpdate(text);
  };
  // console.log("Text",textUpdate)

  const handleSkillData = (skillText) => {
    setTextSkill(skillText);
  };

  // console.log("Skill", textSkill);

  return (
    <ImageContext.Provider
      value={{
        imageUrl,
        updateImageUrl,
        textUpdate,
        handleTextContext,
        handleSkillData,
        textSkill,
        experienceUpdate,
        educationUpdate
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
