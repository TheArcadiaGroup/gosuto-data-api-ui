import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ children, className }) => {
  const bodyRef = useRef(document.getElementById(`modal`))

  return ReactDOM.createPortal(children, bodyRef.current)
}

export default Portal
