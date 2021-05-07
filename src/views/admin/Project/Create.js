import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { postProject } from '../../../api/project'
// components

export default function Create() {
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit } = useForm()

  const onSubmit = (values) => {
    postProject(values)
      .then(() => {
        window.location.replace('/admin/projects')
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message)
        }
      })
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">Create Project</h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Project Information
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Name
                        </label>
                        <input
                          {...register('name', {
                            required: true
                          })}
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="lucky"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create
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
