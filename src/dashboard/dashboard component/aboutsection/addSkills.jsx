import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from "react-icons/io";
import { useEditPagesContext } from '../../../component/conext api/textEditApi';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { save, updateNow } from '../../../component/text';
import { useToaster } from '../../../component/conext api/toast';

const AddSkills = () => {
    const {showToast} =useToaster();
    const { categories, setCategories, newCategory, setNewCategory, newSkill, setNewSkill, 
        editedCategoryName, setEditedCategoryName, editCategoryIndex, 
        setEditCategoryIndex, handleAddCategory, handleAddSkill, 
        handleDeleteCategory, handleDeleteSkill, handleEditCategory, 
        storeCategoriesInFirebase,activeCategoryIndex, setActiveCategoryIndex } = useEditPagesContext();
        const [newSkillInputs, setNewSkillInputs] = useState({}); // State to manage individual input fields
        
        useEffect(()=>{
            const fetchCategoriesFromFirebase = async () => {
              try {
                const database = getFirestore();
                const categoryRef = doc(database, "categories", "allCategories");
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
        <div className="mx-auto p-4 text-sm dark:bg-slate-700">
        <h2 className="text-xl font-bold mb-4">Categories and Skills</h2>
        {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
                {editCategoryIndex === categoryIndex ? (
                    <div className="flex flex-wrap items-center mb-2">
                    <h3 className="text-xl font-semibold mr-2">{category.name}</h3>

                        <input
                            type="text"
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)}
                            className="border border-gray-300 p-2  rounded dark:bg-slate-700 mr-2 "
                        />
                        <button onClick={handleEditCategory} className="px-4 rounded py-2 bg-blue-500 dark:bg-gray-800 dark:hover:bg-slate-900 dark:border text-white rounded">{save}</button>
                    </div>
                ) : (
                    <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold mr-2">{category.name}</h3>
                        <button onClick={() => setEditCategoryIndex(categoryIndex)} className="p-1 bg-blue-500 text-lg text-white rounded mr-2 hover:bg-blue-900 dark:bg-gray-800 dark:hover:bg-slate-900  text-white rounded transistion-transform hover:transform  hover:scale-90"><CiEdit/></button>
                        <button onClick={() => handleDeleteCategory(categoryIndex)} className="p-1 text-lg bg-red-500 text-white hover:bg-red-600 dark:bg-gray-800 dark:hover:bg-slate-900  text-white rounded transistion-transform hover:transform  hover:scale-90rounded">
                        <MdDeleteOutline className='hover:transistion-transform hover:duration-500'/></button>
                    </div>
                )}
                    <ul className="list-disc pl-4">
                        {category.skills.map((skill, skillIndex) => (
                            <li key={skillIndex} className="flex items-center">
                                {skill}
                                <button onClick={() =>handleDeleteSkill(categoryIndex,skillIndex)} className="ml-2 text-red-600 dark:text-white p-2 hover:bg-red-700 dark:bg-gray-800 dark:hover:bg-slate-900  hover:text-white rounded transistion-transform hover:transform  hover:scale-90">
                                 <MdDeleteOutline className='text-lg dark-text-white'/></button>
                            </li>
                        ))}
                    </ul>


                    <div className="flex mt-2">
                    <input
                        type="text"
                        value={newSkillInputs[categoryIndex] || ''}
                        onChange={(e) => handleInputChange(categoryIndex, e.target.value)}
                        className="border dark:bg-gray-800 rounded border-gray-300 p-2 mr-2"
                        placeholder="Add new skill"
                        onFocus={() => setActiveCategoryIndex(categoryIndex)}
                        onBlur={() => setActiveCategoryIndex(null)}
                        autoFocus={activeCategoryIndex === categoryIndex}
                    />
                    <button
                        onClick={() => handleAddSkillSubmit(categoryIndex)}
                        className="p-2 hover:bg-blue-900 bg-blue-500 text-white rounded 
                        transistion-transform hover:transform  
                        hover:scale-90 bg-blue-500 text-white rounded dark:bg-gray-800 dark:hover:bg-slate-900 ">
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
                    className="border rounded dark:bg-gray-800 border-gray-300 p-2 mr-2 "
                    placeholder="Add new category"
                />
                <button onClick={handleAddCategory} className="p-2 hover:bg-blue-900 bg-blue-500 dark:bg-gray-800 dark:hover:bg-slate-900  text-white rounded transistion-transform hover:transform  hover:scale-90">
                <IoMdAdd className='text-lg'/>
                </button>
            </div>
            <div className="mt-4">
                <button onClick={storeCategoriesInFirebase} className="px-4 py-2 text-sm bg-green-500 dark:bg-gray-800 dark:hover:bg-slate-900  text-white rounded p-2  text-white rounded transistion-transform hover:transform  hover:scale-90">{updateNow}</button>
            </div>
        </div>
    );
};

export default AddSkills;
