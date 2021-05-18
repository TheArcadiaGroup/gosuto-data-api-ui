import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getUserByID, banUser } from '../../../api/index'
import { useParams } from 'react-router-dom'
// components

export default function banUserView(props) {
  const [serverError, setServerError] = useState('')
  const [user, setUser] = useState(null)
  const { register, handleSubmit } = useForm()
  let { id } = useParams()
  useEffect(() => {
    async function LoadUser() {
      let res = await getUserByID(id)
      setUser(res.data)
    }
    LoadUser()
  }, [id])
  const onSubmit = (values) => {
    values.user = user
    banUser(values)
      .then(() => {
        window.location.replace('/dashboard/users')
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
                  <h6 className="text-blueGray-700 text-xl font-bold">Ban User</h6>
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
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user && user.email}
                          readOnly
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Motif
                        </label>
                        <input
                          type="text"
                          {...register('motifBan', {
                            required: true,
                            minLength: 7
                          })}
                          defaultValue={user && user.motifBan}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Ban User
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
