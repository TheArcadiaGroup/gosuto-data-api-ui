import React from 'react'
import { createPopper } from '@popperjs/core'
import { banUser } from '../../api/index'
import { Link } from 'react-router-dom'
const UsersDropDown = (props) => {
  const { user } = props
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'left-start'
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }

  const ban = () => {
    banUser(user._id)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        //window.location.reload()
      })
  }

  return (
    <>
      <div
        role="link"
        className="text-blueGray-500 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}
        style={{ cursor: 'pointer' }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <Link
          to={`/dashboard/user/ban/${user._id}`}
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          style={{ cursor: 'pointer' }}
        >
          Ban User
        </Link>
      </div>
    </>
  )
}

export default UsersDropDown
