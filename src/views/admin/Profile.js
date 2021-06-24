import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserInfo } from '../../api/index'
import { setUser } from '../../store/actions/user'
// components

export default function Profile() {
  const { isAuth, user } = useSelector((state) => state.user)
  const [serverError, setServerError] = useState('')
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const onSubmit = (values) => {
    updateUserInfo(values)
      .then((res) => {
        const user = res.data.user
        console.log(user)
        dispatch(setUser(user))

        // window.location.reload()
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message)
        }
      })
  }
  return (
    <>
      <div className="flex flex-wrapz">
        <div className="w-full lg:w-12/12 px-4">
          <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                  <Link
                    to="/dashboard/profile/editPassword"
                    className="bg-lightBlue-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Edit Password
                  </Link>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    User Information
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          {...register('email', {
                            required: true
                          })}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={user.email}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          {...register('firstName', {
                            required: true
                          })}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={user.firstName}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          {...register('lastName', {
                            required: true
                          })}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={user.lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Edit Account
                    </button>
                    {serverError && <span style={{ color: 'red' }}>{serverError}</span>}
                  </div>
                </form>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  )
}
