import { createContext, useContext, useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useToaster } from "./toast";

const EditButtonContext = createContext();

export const useEditPagesContext = () => {
  const context = useContext(EditButtonContext);
  if (!context) {
    throw new Error("useEditPagesContext should be within the provider");
  }
  return context;
};

export const EditPagesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [editCategoryIndex, setEditCategoryIndex] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const {showToast} = useToaster();

  const handleAddCategory = () => {
    if (newCategory.trim() !== "")
     {
      setCategories([...categories, { name: newCategory, skills: [] }]);
      setNewCategory("");

    }


  };
  const handleAddSkill = (categoryIndex, skillName) => {
    const updatedCategories = [...categories]; // Create a copy of categories
    updatedCategories[categoryIndex].skills.push(skillName); // Add the new skill
    setCategories(updatedCategories); // Update the state with the modified categories
};

  const handleDeleteSkill = (categoryIndex, skillIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].skills.splice(skillIndex, 1);
    setCategories(updatedCategories);
    showToast(`Deleted sucessfully`, "", "red");
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleEditCategory = () => {
    if (editedCategoryName.trim() !== "") {
      const updatedCategories = [...categories];
      updatedCategories[editCategoryIndex].name = editedCategoryName;
      setCategories(updatedCategories);
      setEditCategoryIndex(null);
      setEditedCategoryName("");
    }
  };

  const storeCategoriesInFirebase = async () => {
    try {
      const database = getFirestore();
      const categoryRef = doc(database, "categories", "allCategories");
      await setDoc(categoryRef, { categories });
      showToast("Updated Successfully");
    } catch (error) {
      console.error("Error storing categories in Firebase:", error);
    }
  };
  const storeExperienceInFirebase = async () => {
    try {
      const database = getFirestore();
      const categoryRef = doc(database, "experience", "allExperience");
      await setDoc(categoryRef, { categories });
      showToast("Updated Successfully");
    } catch (error) {
      console.error("Error storing categories in Firebase:", error);
    }
  };

  const storeEducationInFirebase = async () => {
    try {
      const database = getFirestore();
      const categoryRef = doc(database, "education", "allEducation");
      await setDoc(categoryRef, { categories });
      showToast("Updated Successfully");
    } catch (error) {
      console.error("Error storing categories in Firebase:", error);
    }
  };
 

  return (
    <EditButtonContext.Provider
      value={{
        categories,
        setCategories,
        newCategory,
        setNewCategory,
        newSkill,
        setNewSkill,
        editCategoryIndex,
        setEditCategoryIndex,
        editedCategoryName,
        setEditedCategoryName,
        activeCategoryIndex,
        setActiveCategoryIndex,
        handleAddCategory,
        handleAddSkill,
        handleDeleteCategory,
        handleDeleteSkill,
        handleEditCategory,
        storeExperienceInFirebase,
        storeEducationInFirebase,
        storeCategoriesInFirebase
              }}
    >
      {children}
    </EditButtonContext.Provider>
  );
};
