import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { attemptGetConfirmation } from '../../store/thunks/auth'

export default function ConfirmPage() {
  const { isAuth } = useSelector((state) => state.user)
  const [serverError, setServerError] = useState('')
  const dispatch = useDispatch()
  const { token } = useParams()

  function doSubmit() {
    dispatch(attemptGetConfirmation(token)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message)
      }
    })
  }

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="text-center mt-12">
              <i className="fa fa-check-circle"></i>
              <h2 className="margin-top-30">Click here to confirm your email</h2>

              <button onClick={doSubmit} classNameName="button">
                Confirmation
              </button>
              {serverError && <span style={{ color: 'red' }}>{serverError}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
