import { FaSearch } from 'react-icons/fa';
import { useSearch } from '../component/conext api/searchContext';
import { useEffect } from 'react'; // Import useEffect hook
import Dashboard from './dashboard component/dashboard';
import Settings from './dashboard component/profile section/profile_setting';
import AddContact from './dashboard component/contact section/addContact';
import AddSkills from './dashboard component/aboutsection/addSkills';
import AddService from './dashboard component/service section/addService';
import MyAccount from './dashboard component/profile section/myaccount';

const SearchButton = () => {
  const { searchQuery, setSearchQuery, searchResults, setSearchResults } = useSearch();

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const component = arr[mid];
      const componentName = component.name; // Assuming 'name' is the property holding the component name
  
      // Ensure componentName is a string before calling toLowerCase
      if (typeof componentName === 'string') {
        const cmp = componentName.toLowerCase(); // Convert to lowercase for case-insensitive search
  
        if (cmp === target) {
          return mid; // Found the target component
        } else if (cmp < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      } else {
        // Handle the case where componentName is not a string
        console.error('Component name is not a string:', componentName);
        return -1; // or handle the error in another appropriate way
      }
    }
  
    return -1; // Target not found
  };
  const performSearch = (query) => {
    // Assuming your data is an array of components with their names
    const data = [
      { component: Dashboard, name: 'Dashboard' },
      { component: MyAccount, name: 'My Account' },
      { component: Settings, name: 'Settings' },
      { component: AddContact, name: 'Add Contact' },
      { component: AddSkills, name: 'Add Skills' },
      { component: AddService, name: 'Add Service' }
    ];
  
    const results = data.filter((item) => {
      // Ensure each object in the data array has a name property
      if (!item || typeof item.name !== 'string') {
        console.error('Invalid data format:', item);
        return false;
      }
      const componentName = item.name.toLowerCase();
      return binarySearch(componentName, query.toLowerCase()) !== -1;
    });
  
    return results;
  };
  useEffect(() => {
    // Perform search when searchQuery changes
    const results = performSearch(searchQuery);
    setSearchResults(results);
  }, [searchQuery]); // Re-run effect when searchQuery changes

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in useEffect when searchQuery changes
  };

  return (
    <>
      <div className='flex flex-grow dark:text-white dark:border-white'>
        <form onSubmit={handleSearch} className='flex items-center w-full'>
          <input
            type='search'
            placeholder='Type to search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='mx-auto rounded w-full p-2 border dark:border-none dark:text-white dark:bg-slate-800 focus:outline-none'
          />
          <button type='submit' className='p-2 items-center -ml-7 text-white dark:bg-gray-800 dark:bg-stone-400 dark:text-black h-full w-fit rounded-r'><FaSearch /></button>
        </form>
      </div>
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchButton;
