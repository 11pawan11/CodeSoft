import { collection, getDocs, getFirestore, updateDoc, doc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Notificationss } from '../component/text';

const Notification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0); // Track the count of unread messages



  const trigger = useRef();
  const dropdown = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Firestore
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const fetchedData = querySnapshot.docs.map(doc => {
          const messageData = doc.data();
          return { ...messageData, id: doc.id, read: messageData.read || false }; // Set default value for read property
        });
        setMessages(fetchedData);
        
        // Count the unread messages
        const unreadMessages = fetchedData.filter(message => !message.read);
        setUnreadMessagesCount(unreadMessages.length);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString(undefined, options); // Convert to local date and time format with month name
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      const db = getFirestore();
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, { read: true }); // Mark the message as read in Firestore
      const updatedMessages = messages.map(message => {
        if (message.id === messageId) {
          return { ...message, read: true }; // Update the read property of the message
        }
        return message;
      });
      setMessages(updatedMessages);
      
      // Recalculate the count of unread messages
      const unreadMessages = updatedMessages.filter(message => !message.read);
      setUnreadMessagesCount(unreadMessages.length);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <ul>
      <li className="relative">
        <Link
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          to="#"
          className="relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-gray-100 bg-white hover:text-blue-800 dark:border-slate-400 dark:bg-gray-600 dark:text-white"
        >
          {unreadMessagesCount > 0 && ( // Render red dot if there are unread messages
            <span className="absolute -top-2 -right-1 z-1 h-3 w-3 rounded-full bg-red-600 animate-bounce">
              <span className="absolute -z-1 inline-flex h-full w-full -top-1 -right-[3px] text-white text-[10px] rounded-full  opacity-75">{unreadMessagesCount}</span>
            </span>
          )}
          <FaBell className='text-lg' />
        </Link>
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`absolute -right-[65px] mt-5 flex h-90 w-75 flex-col z-50 rounded-sm border border-slate-500 bg-white p-2 shadow-default dark:border-gray-100 dark:bg-gray-600 sm:right-0 sm:w-80 ${dropdownOpen === true ? 'block' : 'hidden'
            }`}
        >
          <div className="-right-27 py-2">
            <p className='font-semibold border-b border-gray-400 mb-2'>{Notificationss}</p>
            {messages.length === 0 && <p className='items-center justify-center text-center'>No Notification Available</p>}
          </div>

          <ul className="flex h-auto flex-col overflow-y-auto">
            {messages.slice().reverse().map((message, index) => ( // Reverse the messages array before mapping
              <li key={index} className='border-b border-gray-400 mt-2'>
                <p>Name: {message.name}</p>
                <p>Email: {message.email}</p>
                <p className='mb-2'>Message: {message.message}</p>
                <p className='mr-2'>{formatTimestamp(message.timestamp)}
                <span className='float-right'>{!message.read && ( // Render mark as read button if the message is unread
                  <button onClick={() => handleMarkAsRead(message.id)} className='bg-red-600 text-white rounded p-[2px] text-[10px] ml-auto mb-1'>Mark as Read</button>
                )}</span>
                </p>
              </li>
            ))}
          </ul>       
        </div>
      </li>
    </ul>
  );
};

export default Notification;
