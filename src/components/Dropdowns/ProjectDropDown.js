import React from 'react'
import { createPopper } from '@popperjs/core'
import addNotification from '../Notification'
import { regenrateApiKey, deleteProject, toggleProject } from '../../api/project'
import { Link } from 'react-router-dom'
const ProjectDropDown = (props) => {
  const { project } = props
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

  const regenrate = () => {
    regenrateApiKey(project._id)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        //window.location.reload()
      })
  }
  const toggle = () => {
    toggleProject(project._id)
      .then(() => {
        window.location.reload()
        //addNotification('Project Toggled', 'Project Toggled')
      })
      .catch((error) => {
        console.log(error.response.data)
        addNotification('Project Toggled', error.response.data.message, 'danger')
        //window.location.reload()
      })
  }
  const deleteP = () => {
    deleteProject(project._id)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        //window.location.reload()
      })
  }
  const editP = () => {
    window.location.replace(`/dashboard/project/edit/${project._id}`)
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
          to={`/dashboard/project/edit/${project._id}`}
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Edit
        </Link>

        <div
          role="link"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          style={{ cursor: 'pointer' }}
          onClick={() => regenrate()}
        >
          Re Generate API key
        </div>
        <div
          role="link"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          style={{ cursor: 'pointer' }}
          onClick={() => toggle()}
        >
          {project.isActive ? 'Desactivate' : 'Activate'}
        </div>
        <div
          role="link"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          style={{ cursor: 'pointer' }}
          onClick={() => deleteP()}
        >
          Delete
        </div>
      </div>
    </>
  )
}

export default ProjectDropDown
