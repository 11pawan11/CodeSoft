import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  AddProject,
  AddProjects,
  EditProject,
  browse,
  cancel,
  deleted,
  drag,
  edit,
  save,
  uploadImages,
  uploadProject,
  viewProject,
} from "../../../component/text";
import { storage } from "../../../firebase/initialStart";
import { useToaster } from "../../../component/conext api/toast";
import { FaTimes } from "react-icons/fa";

const AddWork = () => {
  const { showToast } = useToaster();
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState(false);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const database = getFirestore();
    const projectsCollection = collection(database, "projects");

    const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async () => {
    if (!validateInputs()) {
      return;
    }

    // Upload images and create project data
    const imagesData = await Promise.all(
      images.map(async (image, index) => {
        const imageRef = ref(storage, `projectImages/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        return {
          imageUrl,
          description: imageDescriptions[index] || "",
        };
      })
    );

    try {
      const database = getFirestore();
      const projectRef = collection(database, "projects");
      const projectData = {
        name: projectName,
        description: projectDescription,
        images: imagesData,
      };

      await addDoc(projectRef, projectData);
      showToast("Project uploaded successfully!");

      // Reset input fields
      setProjectName("");
      setProjectDescription("");
      setImages([]);
      setImageDescriptions([]);

      // Reset file input field
      const fileInput = document.getElementById("imageUpload");
      fileInput.value = "";

      // Close edit section
      setEditProjectName("");
      setEditProjectDescription("");
      setEditProjectId(null);
    } catch (error) {
      showToast(`Error uploading project: ${error}`, "", "red");
      showToast("Error uploading project. Please try again.", "", "red");
    }
  };

  const validateInputs = () => {
    let isValid = true;
    if (!projectName.trim()) {
      setNameError("Please enter a project name.");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!projectDescription.trim()) {
      setDescriptionError("Please enter a project description.");
      isValid = false;
    } else {
      setDescriptionError("");
    }
    if (images.length === 0) {
      setImageError("Please select at least one image.");
      isValid = false;
    } else {
      setImageError("");
    }
    return isValid;
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const database = getFirestore();
      const projectDoc = doc(database, "projects", projectId);
      const project = projects.find((project) => project.id === projectId);

      // Delete images from storage
      project.images.forEach(async (image) => {
        const imageRef = ref(storage, image.imageUrl);
        await deleteObject(imageRef);
      });

      await deleteDoc(projectDoc);
      setProjects(projects.filter((project) => project.id !== projectId));
      showToast("Project deleted successfully!", "", "red");
    } catch (error) {
      showToast(`Error deleting project ${error}`, "", "red");
      showToast("Error deleting project. Please try again.", "", "red");
    }
  };

  const handleEditProject = async () => {
    try {
      const database = getFirestore();
      const projectDoc = doc(database, "projects", editProjectId);
      await updateDoc(projectDoc, {
        name: editProjectName,
        description: editProjectDescription,
      });
      showToast("Project updated successfully!");
    } catch (error) {
      showToast(`Error updating project ${error}`, "", "red");
      showToast("Error updating project. Please try again.", "", "red");
    }
    // Close edit section
    setEditProjectName("");
    setEditProjectDescription("");
    setEditProjectId(null);
  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const imagesArray = [];
    const descriptionsArray = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      imagesArray.push(file);
      descriptionsArray.push("");
    }

    setImages(imagesArray);
    setImageDescriptions(descriptionsArray);
  };
  // const handleImageChange = (e) => {
  //     const files = e.target.files;
  //     const selectedImagesArray = Array.from(files).map(file => URL.createObjectURL(file));
  //     setImages(selectedImagesArray);
  // }

  const handleAddProject = () => {
    setShowAddProject(true);
  };

  const handleEditInputChange = (e) => {
    if (e.target.name === "editProjectName") {
      setEditProjectName(e.target.value);
    } else if (e.target.name === "editProjectDescription") {
      setEditProjectDescription(e.target.value);
    }
  };

  const handleEditCancel = () => {
    setEditProjectName("");
    setEditProjectDescription("");
    setEditProjectId(false);
  };

  const openEditModal = (projectId, projectName, projectDescription) => {
    setEditProjectId(projectId);
    setEditProjectName(projectName);
    setEditProjectDescription(projectDescription);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const selectedImagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages(selectedImagesArray);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCancelImage = (index) => {
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
  };

  return (
    <div className="container mx-auto dark:bg-slate-500 dark:text-white">
      <p className="text-3xl font-bold mb-4 dark:text-white text-gray-800">{AddProjects}</p>
      {!showAddProject && (
        <button
          onClick={handleAddProject}
          className="bg-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-8"
        >
          {AddProject}
        </button>
      )}
      {showAddProject && (
        <div className="mx-auto dark:text-white space-y-2">
          <input
            type="text"
            placeholder="Project Name"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 dark:bg-gray-800 dark:hover:bg-slate-700  focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700"
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
          <textarea
            rows={9}
            cols={5}
            placeholder="Add Project Description"
            required
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full border border-gray-300 dark:bg-gray-800 dark:hover:bg-slate-700 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700"
          />

          {/* Image uploading model */}
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}

          <div className="flex flex-col items-center justify-center ">
            <label
              htmlFor="imageUpload"
              className="bg-blue-500  dark:bg-gray-800 dark:hover:bg-slate-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              <svg
                className="w-6 h-6 inline-block mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              {uploadImages}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              id="imageUpload"
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              className="mt-8 border border-dashed border-gray-400 rounded-md p-8"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <p className="text-gray-600 dark:text-white text-center">
                {drag}
                <br />
                {browse}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 transistion-transform duration-500 ease-in-out">
              {images.map((image, index) => (
                
                <div key={index} className="relative gap-4">
                <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected image ${index}`}
                      className="w-20 h-20 object-cover rounded-md  mb-2" />
                      <button
                          className="absolute right-0 bg-black top-0 text-white  rounded-full transisiton-all duration-500 ease-in-out hover:scale-110 "
                          onClick={()=>handleCancelImage(index)}>                                             
                             <FaTimes />
                      </button>
                      </div>
              ))}
            </div>
          </div>

          {imageError && <p className="text-red-500">{imageError}</p>}
          <div className="text-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700"
              onClick={handleImageUpload}
            >
              {uploadProject}
            </button>
          </div>
        </div>
      )}
      <h2 className="text-3xl font-semibold mt-12 mb-6">{viewProject}</h2>
      <div className="dark:bg-slate-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .slice()
          .reverse()
          .map((project) => (
            <div
              key={project.id}
              className=" dark:bg-slate-500 dark:border bg-gray-100 p-6 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
              {project.images && project.images.length > 0 && ( 
        <div className="grid grid-cols-2 gap-4">
          {project.images.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={image.description}
              className="w-full h-auto rounded-md"
            />
          ))}
        </div>
      )}
              <div className="flex mt-4 justify-center space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700"
                  onClick={() =>
                    openEditModal(project.id, project.name, project.description)
                  }
                >
                  {edit}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700 "
                  onClick={() => handleDeleteProject(project.id)}
                >
                  {deleted}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Project Modal */}
      {editProjectId && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="dark:bg-gray-800  bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center ">
              {EditProject}
            </h2>
            <input
              type="text"
              name="editProjectName"
              value={editProjectName || ""}
              onChange={handleEditInputChange}
              className="w-full border border-gray-300 dark:bg-gray-800 dark:hover:bg-slate-700 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <textarea
              rows={6}
              cols={5}
              name="editProjectDescription"
              value={editProjectDescription || ""}
              onChange={handleEditInputChange}
              className="w-full border border-gray-300 rounded-md dark:bg-gray-800 dark:hover:bg-slate-700 px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 dark:bg-gray-800 dark:hover:bg-slate-700"
                onClick={handleEditProject}
              >
                {save}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700"
                onClick={handleEditCancel}
              >
                {cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWork;
