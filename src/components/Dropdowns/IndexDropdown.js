import React from 'react'
import { Link } from 'react-router-dom'
import { createPopper } from '@popperjs/core'
import { useSelector } from 'react-redux'
const IndexDropdown = () => {
  const { isAuth, user } = useSelector((state) => state.user)
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start'
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }
  return isAuth ? (
    <>
      <a
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}
      >
        {`${user.firstName} ${user.lastName}`}
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <span
          className={
            'text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400'
          }
        >
          Welcome !
        </span>
        <Link
          to="/dashboard"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Dashboard
        </Link>
        <Link
          to="/dashboard/profile"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Profile
        </Link>
        <Link
          to="/auth/logout"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Log Out
        </Link>
      </div>
    </>
  ) : (
    <>
      <Link
        to="/auth/login"
        className={
          'text-blueGray-700 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent '
        }
      >
        Login
      </Link>
      <Link
        to="/auth/register"
        className={
          'text-blueGray-700 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent'
        }
      >
        Register
      </Link>
    </>
  )
}
export default IndexDropdown
