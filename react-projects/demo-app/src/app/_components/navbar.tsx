import React from 'react'
export default function Navbar() {
    return (
      <div className="fixed backdrop-blur-md bg-white dark:bg-[#121212] bg-opacity-60 w-full flex flex-row justify-center z-20">
        <div className="flex flex-row justify-between items-center w-[72rem] p-4">
          <div className="flex dark:text-white">
            <p>AR.</p>
          </div>
          <div className="flex flex-row justify-end md:justify-between w-full md:w-auto gap-4 md:gap-10">
            {/* Links component - Visible on large screens and not on small screens */}
            <ul className="hidden md:flex flex-row items-center text-sm md:text-base gap-4 md:gap-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] dark:text-white rounded-full px-6 md:px-10 w-auto h-12 md:h-16">
              <li>
                <a href="#" rel="noopener noreferrer" className="hover:text-purple-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" rel="noopener noreferrer" className="hover:text-purple-600">
                  About
                </a>
              </li>
              <li>
                <a href="#work" rel="noopener noreferrer" className="hover:text-purple-600">
                  Work
                </a>
              </li>
              <li>
                <a href="#blogs" rel="noopener noreferrer" className="hover:text-purple-600">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#contact" rel="noopener noreferrer" className="hover:text-purple-600">
                  Contact
                </a>
              </li>
            </ul>
  
            <button
              
              aria-label="theme menu"
              className="flex bg-white w-12 h-12 md:w-16 md:h-16 flex-row justify-center items-center border-gray-300 dark:border-gray-600 dark:bg-[#121212] dark:text-white border rounded-full"
            >
              <i id="theme-toggler-sun" className="ri-sun-fill text-yellow-400 ri-xl"></i>
              <i id="theme-toggler-moon" className="ri-moon-clear-line text-blue-800 ri-xl"></i>
            </button>
  
            <div className="relative">
              <button
                
                aria-label="Menu"
                className="flex md:hidden bg-white w-12 h-12 md:w-16 md:h-16 flex-row justify-center items-center border-gray-300 dark:border-gray-600 dark:bg-[#121212] dark:text-white border rounded-full"
              >
                <i id="menu-toggler" className="ri-menu-line ri-xl"></i>
              </button>
              {/* Drop Down component for Links (Not visible on Large screens) */}
              <ul
                id="menu-list"
                className="fixed flex -top-80 right-0 flex-col items-center text-sm md:text-base gap-4 md:gap-10 dark:border-gray-600 dark:text-white rounded-sm p-6 md:px-10 w-full h-auto bg-white dark:bg-[#121212] transition-all duration-500 ease-out"
              >
                <li>
                  <a href="#" rel="noopener noreferrer" className="hover:text-purple-600">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" rel="noopener noreferrer" className="hover:text-purple-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#work" rel="noopener noreferrer" className="hover:text-purple-600">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#blogs" rel="noopener noreferrer" className="hover:text-purple-600">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#contact" rel="noopener noreferrer" className="hover:text-purple-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
