import React from 'react'
import { Link } from 'react-router-dom'
import UserDropdown from 'components/Dropdowns/UserDropdown.js'

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Link
                  to="/dashboard/pricing"
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold
                  uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none
                  focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  CHANGE PLAN
                </Link>
              </div>
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  )
}
