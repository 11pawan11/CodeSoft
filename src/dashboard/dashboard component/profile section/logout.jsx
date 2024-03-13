import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/initialStart'
import { useToaster } from '../../../component/conext api/toast'

  const {showToast} = useToaster();
  export const handleLogout = async () => {
    try
     {
      await signOut(auth);
      showToast("Logout SUcessfully")
    }
    catch(error){
      showToast("Error during logout",error)
    }
  };

