import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { AddProject, AddProjects } from '../../../component/text';
import { storage } from '../../../firebase/firebase';

const AddWork = () => {
    const [showAddProject, setShowAddProject] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imageDescriptions, setImageDescriptions] = useState([]);
    const [projects, setProjects] = useState([]);
    const [editProjectName, setEditProjectName] = useState('');
    const [editProjectDescription, setEditProjectDescription] = useState('');
    const [editProjectId, setEditProjectId] = useState('');

    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         try {
    //             const database = getFirestore();
    //             const projectsCollection = collection(database, 'projects');
    //             const projectsSnapshot = await getDocs(projectsCollection);
    //             const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //             setProjects(projectsData);
    //         } catch (error) {
    //             console.error('Error fetching projects:', error);
    //         }
    //     };
    //     fetchProjects();
    // }, []);

    useEffect(() => {
      const database = getFirestore();
      const projectsCollection = collection(database, 'projects');

      const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
          const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProjects(projectsData);
      });

      return () => unsubscribe();
  }, []);

    const handleImageUpload = async () => {
        // Check if image size exceeds 2MB
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if (image.size > 2 * 1024 * 1024) {
                alert('Image size exceeds 2MB. Please select a smaller image.');
                return;
            }
               // Reset input fields
                  setProjectName('');
                  setProjectDescription('');
                  setImages([]);
                  setImageDescriptions([]);

                  // Close edit section
                  setEditProjectName('');
                  setEditProjectDescription('');
                  setEditProjectId(null);
          };

        const imagesData = await Promise.all(images.map(async (image, index) => {
            const imageRef = ref(storage, `projectImages/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            return {
                imageUrl,
                description: imageDescriptions[index] || ''
            };
        }));

        try {
            const database = getFirestore();
            const projectRef = collection(database, 'projects');
            const projectData = {
                name: projectName,
                description: projectDescription,
                images: imagesData
            };

            await addDoc(projectRef, projectData);
            alert('Project uploaded successfully!');
        } catch (error) {
            console.error('Error uploading project:', error);
            alert('Error uploading project. Please try again.');
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            const database = getFirestore();
            const projectDoc = doc(database, 'projects', projectId);
            const project = projects.find(project => project.id === projectId);

            // Delete images from storage
            project.images.forEach(async (image) => {
                const imageRef = ref(storage, image.imageUrl);
                await deleteObject(imageRef);
            });

            await deleteDoc(projectDoc);
            setProjects(projects.filter(project => project.id !== projectId));
            alert('Project deleted successfully!');
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project. Please try again.');
        }
    };

    const handleEditProject = async () => {
        try {
            const database = getFirestore();
            const projectDoc = doc(database, 'projects', editProjectId);
            await updateDoc(projectDoc, {
                name: editProjectName,
                description: editProjectDescription
            });
            alert('Project updated successfully!');
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Error updating project. Please try again.');
        }
          // Close edit section
            setEditProjectName('');
            setEditProjectDescription('');
            setEditProjectId(null);
    };

    const handleImageChange = (e) => {
        const fileList = e.target.files;
        const imagesArray = [];
        const descriptionsArray = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            imagesArray.push(file);
            descriptionsArray.push('');
        }

        setImages(imagesArray);
        setImageDescriptions(descriptionsArray);
    };

    const handleAddProject = () => {
        setShowAddProject(true);
    };

    const handleEditInputChange = (e) => {
        if (e.target.name === 'editProjectName') {
            setEditProjectName(e.target.value);
        } else if (e.target.name === 'editProjectDescription') {
            setEditProjectDescription(e.target.value);
        }
    };

    const handleEditCancel = () => {
        setEditProjectName('');
        setEditProjectDescription('');
        setEditProjectId('null');

           // Reset edit fields
        
    };

    const openEditModal = (projectId, projectName, projectDescription) => {
      setEditProjectId(projectId);
      setEditProjectName(projectName);
      setEditProjectDescription(projectDescription);
  };

    return (
        <div className="container mx-auto dark:bg-slate-500">
            <p className='text-3xl font-bold mb-4'>{AddProjects}</p>
            {!showAddProject && (
                <button onClick={handleAddProject} className="bg-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-8">{AddProject}</button>
            )}
            {showAddProject && (
                <div className="mx-auto">
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4dark:bg-gray-800 dark:hover:bg-slate-700  focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700"
                    />
                    <textarea
                        rows={9} cols={5}
                        placeholder="Add Project Description"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="w-full border border-gray-300 dark:bg-gray-800 dark:hover:bg-slate-700 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mr-4  border border-gray-300 dark:bg-gray-800 dark:hover:bg-slate-700 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700"
                    />
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700" onClick={handleImageUpload}>Upload Project</button>
                </div>
            )}
            <h2 className="text-3xl font-semibold mt-12 mb-6">Projects</h2>
            <div className="dark:bg-slate-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
                <div key={project.id} className=" dark:bg-slate-500 dark:border bg-gray-100 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                        
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {project.images.map((image, index) => (
                            <img key={index} src={image.imageUrl} alt={image.description} className="w-full h-auto rounded-md" />
                        ))}
                    </div>
                    <div className="flex mt-4 justify-center space-x-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700" onClick={() => openEditModal(project.id, project.name, project.description)}>Edit</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700 " onClick={() => handleDeleteProject(project.id)}>Delete</button>
                    </div>  
                </div>
            ))}
        </div>
        

            {/* Edit Project Modal */}
            {editProjectId && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="dark:bg-gray-800  bg-white p-8 rounded-lg w-96">
                        <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>

                        <input
                        type="text"
                        name="editProjectName"
                        value={editProjectName || ''}
                        onChange={handleEditInputChange}
                        className="w-full border border-gray-300 dark:bg-gray-800 dark:hover:bg-slate-700 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                        rows={6}
                        cols={5}
                        name="editProjectDescription"
                        value={editProjectDescription || ''}
                        onChange={handleEditInputChange}
                        className="w-full border border-gray-300 rounded-md dark:bg-gray-800 dark:hover:bg-slate-700 px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                    />
                        <div className="flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 dark:bg-gray-800 dark:hover:bg-slate-700" onClick={handleEditProject}>Save</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded dark:bg-gray-800 dark:hover:bg-slate-700" onClick={handleEditCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddWork;
