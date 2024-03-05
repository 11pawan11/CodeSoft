import  { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const useImage = () =>
{ 
  const context = useContext(ImageContext);
  if (!context){
    throw new Error('useImageContext should be withinthe Image Provider')
  }
  return context;
}

export const ImageProvider = ({ children }) => {

  const [imageUrl, setImageUrl] = useState(null); // Initialize imageUrl with null
  const [loading, setLoading] = useState(true); // Initialize loading state

  const setImage = (url) => {
    setImageUrl(url);
    setLoading(false); // Set loading to false once imageUrl is updated
    console.log("test from context", url);
  };

  return (
    <ImageContext.Provider value={{ imageUrl, setImage, loading }}>
      {children}
    </ImageContext.Provider>
  );
};
