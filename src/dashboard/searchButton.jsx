import { FaSearch } from 'react-icons/fa';

const SearchButton = () => {
  return (
    <>
    <div className='flex flex-grow dark:text-white dark:border-white'>
        <form action="" method="POST" className='flex items-center w-full'>
        <input type='search'
         placeholder='Type to search' 
         className='mx-auto rounded w-full p-2 border dark:border-none dark:text-white dark:bg-slate-800 focus:outline-none'
         />
         <button className='p-2 items-center -ml-7  text-white dark: bg-gray-800 dark:bg-stone-400 dark:text-black h-full w-fit rounded-r' ><FaSearch/></button> 
        </form>
        </div>
    </>
    );
};

export default SearchButton;