import { FaMoon, FaSun } from "react-icons/fa";
import useColorMode from "./useColorMode";

const DarkMode = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li>
      <label
        className={`relative m-0 block h-7 w-14 bg-gray-400 rounded-full ${
          colorMode === 'dark' ? '' : ''
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            if (typeof setColorMode === 'function') {
              setColorMode(colorMode === 'light' ? 'dark' : 'light');
            }
          }}
          className="absolute top-0  m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-300 ease-linear ${
            colorMode === 'dark' && '!right-[3px] !translate-x-full'
          }`}
        >
          <span className="dark:hidden">
            <FaSun className="items-center text-gray-500"/>          
          </span>
          <span className="hidden dark:inline-block">
          <FaMoon className="items-center text-gray-500"/>
          </span>
        </span>
      </label>
    </li>
  );
};

export default DarkMode;
