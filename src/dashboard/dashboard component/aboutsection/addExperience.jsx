import React, { useEffect, useState } from 'react';
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from "react-icons/io";
import { useEditPagesContext } from '../../../component/conext api/textEditApi';
import { updateNow } from '../../../component/text';

const AddExperience = () => {
  const { categories, setCategories, newCategory, setNewCategory, newSkill, setNewSkill, 
    editedCategoryName, setEditedCategoryName, editCategoryIndex, 
    setEditCategoryIndex, handleAddCategory, handleAddSkill, 
    handleDeleteCategory, handleDeleteSkill, handleEditCategory, 
    storeExperienceInFirebase,activeCategoryIndex, setActiveCategoryIndex } = useEditPagesContext();
    const [newSkillInputs, setNewSkillInputs] = useState({}); // State to manage individual input fields
    
    
    useEffect(()=>{
        const fetchCategoriesFromFirebase = async () => {
          try {
            const database = getFirestore();
            const categoryRef = doc(database, "experience", "allExperience");
            const categoryDoc = await getDoc(categoryRef);
            if (categoryDoc.exists()) {
              setCategories(categoryDoc.data().categories || []);
            }
          } catch (error) {
            console.error("Error fetching categories from Firebase:", error);
          }
        };
      
        fetchCategoriesFromFirebase();
      },[]);


      const handleInputChange = (categoryIndex, value) => {
        setNewSkillInputs(prevState => ({
            ...prevState,
            [categoryIndex]: value
        }));
    };

      const handleAddSkillSubmit = (categoryIndex) => {
        handleAddSkill(categoryIndex, newSkillInputs[categoryIndex]);
        setNewSkillInputs(prevState => ({
            ...prevState,
            [categoryIndex]: '' // Clear the input field after submission
        }));
    };
  
    return (
      <div className="mx-auto p-4 text-sm">
      <h2 className="lg:text-xl sm:text-lg font-bold mb-4">Experience and Worked Period</h2>
      {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
              {editCategoryIndex === categoryIndex ? (
                  <div className="flex flex-wrap items-center mb-2">
                  <h3 className="text-xl font-semibold mr-2">{category.name}</h3>

                      <input
                          type="text"
                          value={editedCategoryName}
                          onChange={(e) => setEditedCategoryName(e.target.value)}
                          className="border border-gray-300 p-2 mr-2  "
                      />
                      <button onClick={handleEditCategory} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                  </div>
              ) : (
                  <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold mr-2">{category.name}</h3>
                      <button onClick={() => setEditCategoryIndex(categoryIndex)} className="p-1 bg-blue-500 text-lg text-white rounded mr-2 hover:bg-gray-700 text-white rounded transistion-transform hover:transform  hover:scale-90"><CiEdit/></button>
                      <button onClick={() => handleDeleteCategory(categoryIndex)} className="p-1 text-lg bg-red-500 text-white hover:bg-gray-700 text-white rounded transistion-transform hover:transform  hover:scale-90rounded">
                      <MdDeleteOutline className='hover:transistion-transform hover:duration-500'/></button>
                  </div>
              )}
                  <ul className="list-disc pl-4">
                      {category.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-center">
                              {skill}
                              <button onClick={() => handleDeleteSkill(categoryIndex, skillIndex)} className="ml-2 text-red-600 p-2 hover:bg-gray-700 hover:text-white rounded transistion-transform hover:transform  hover:scale-90">
                               <MdDeleteOutline className='text-lg'/></button>
                          </li>
                      ))}
                  </ul>


                  <div className="flex mt-2">
                  <input
                      type="text"
                      value={newSkillInputs[categoryIndex] || ''}
                      onChange={(e) => handleInputChange(categoryIndex, e.target.value)}
                      className="border border-gray-300 lg:w-80 sm:w-fit p-2 mr-2 placeholder:text-[12px]"
                      placeholder="Add Company Name You worked for and Position "
                      onFocus={() => setActiveCategoryIndex(categoryIndex)}
                      onBlur={() => setActiveCategoryIndex(null)}
                      autoFocus={activeCategoryIndex === categoryIndex}
                  />
                  <button
                      onClick={() => handleAddSkillSubmit(categoryIndex)}
                      className="p-2 hover:bg-gray-700 bg-blue-500 text-white rounded 
                      transistion-transform hover:transform  
                      hover:scale-90 bg-blue-500 text-white rounded">
                      <IoMdAdd className='text-lg' />
                  </button>
              </div>
          </div>
          ))}
          <div className="flex mt-4">
              <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border border-gray-300 p-2 mr-2 lg:w-80 sm:w-fit placehoder:text-[12px]"
                  placeholder="Add the Worked Time Period"
              />
              <button onClick={handleAddCategory} className="p-2 hover:bg-gray-700 bg-blue-500 text-white rounded transistion-transform hover:transform  hover:scale-90">
              <IoMdAdd className='text-lg'/>
              </button>
          </div>
          <div className="mt-4">
              <button onClick={storeExperienceInFirebase} className="px-4 py-2 text-sm bg-green-500 text-white rounded p-2  text-white rounded transistion-transform hover:transform  hover:scale-90">{updateNow}</button>
          </div>
      </div>
  );
};
export default AddExperience;
