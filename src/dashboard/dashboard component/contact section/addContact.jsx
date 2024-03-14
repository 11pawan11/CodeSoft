import { getDocs, getFirestore, collection, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { deleted } from '../../../component/text';

const AddContact = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Firestore
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(fetchedData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const handleDelete = async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'messages', id));
      setMessages(messages.filter(message => message.id !== id));
    } catch (error) {
      console.error('Error deleting message from Firestore:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString(undefined, options); // Convert to local date and time format with month name
  };
  

  return (
    <div className='text-sm'>
      <h2 className='text-3xl font-bold mb-4'>Contact Messages</h2>
      {messages.length === 0 && <p className='text-xl font-semibold'>No Messages Right Now</p>}
      <div className='flex gap-2'>
      {messages.slice().reverse().map((message, index) => ( //pull the latest
        <div key={index} className='border mb-4 border-gray-400 rounded p-2 w-fit'>
          <p><span className='font-bold'>Name:</span> {message.name}</p>
          <p><span className='font-bold'>Email:</span> {message.email}</p>
          <p><span className='font-bold'>Message:</span> {message.message}</p>
          <p>{formatTimestamp(message.timestamp)}</p>

          <button onClick={() => handleDelete(message.id)} className='p-1 mt-2 dark:bg-gray-700 dark:hover:bg-slate-800 opacity text-white rounded bg-red-600'>{deleted}</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default AddContact;
