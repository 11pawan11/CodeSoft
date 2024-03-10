import { createContext, useContext, useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { motion } from "framer-motion";



const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info',color='green') => {
    const toast = {
      id: Date.now(),
      message,
      type,
      color,
    };

    setToasts(prevToasts => [...prevToasts, toast]);
  };

  const CloseToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    const timeoutIds = [];
    toasts.forEach((toast) => {
      const timeoutId = setTimeout(() => {
        CloseToast(toast.id);
      }, 3000); // Adjust the duration here (in milliseconds)
      timeoutIds.push(timeoutId);
    });

    // Clean up timeouts on component unmount
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [toasts]);
  return (
    <ToastContext.Provider value={{ showToast, toasts, CloseToast }}>
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      {toasts.map((toast) => (
        <motion.div 
          key={toast.id} 
          style={{ 
            marginTop:'0px',
            border: '1px solid black',           
            marginBottom: '20px', 
            backgroundColor: toast.color || 'green', // Use toast color or default to green
            color: 'white', 
            padding: '25px', 
            borderRadius: '5px', 
            position: 'relative',
            width: '300px',
             // Make the container position relative
          }}
          initial={{ opacity: 0, y: -20 }} // Initial animation state (not visible)
          animate={{ opacity: 1, y: 0 }} // Animation when the toast appears
          exit={{ opacity: 0, y: -20 }} // Animation when the toast disappears
        >
          <p>{toast.message}</p>
          
          <button 
            onClick={() => CloseToast(toast.id)}      
            style={{ 
              position: 'absolute', 
              top: '5px', 
              right: '5px', 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
            }}
          >
            <TfiClose className="text-sm"/>
          </button>
        </motion.div>
      ))}
    </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToaster = ()=> {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
