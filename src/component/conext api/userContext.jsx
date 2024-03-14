import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/initialStart";
import { useNavigate } from "react-router-dom";
import { useToaster } from "./toast";

const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error ("useContextProviser should be within provider")
    }
    return context;
};

export const UserContextProvider = ({children}) => {
    const [user,setUser] = useState();
    const {showToast} = useToaster();
    let navigate = useNavigate();

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if(!currentUser){
                // navigate('/login');
            }
            else return () => currentUser();
        });
        return () => unsubscribe();
        
    },[navigate]);

    const handleLogout = () => {
        auth.signOut().then(()=>{
            localStorage.clear();
            navigate('/');
        })
        .catch(error => { 
            showToast(`Error during Logout ${error}`,"", "red")
        });
    }

    return (
        <UserContext.Provider value={{user, handleLogout}}>
        {children}
        </UserContext.Provider>
    );
}