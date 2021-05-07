import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister
} from '../../store/thunks/auth'

export default function Register() {
  const { isAuth } = useSelector((state) => state.user)
  const [serverError, setServerError] = useState('')
  const [email, setEmail] = useState('')
  const [registerStep, setRegisterStep] = useState('register') // Use an enum with TS;

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const onSubmit = (values) => {
    alert(JSON.stringify(values))
    dispatch(attemptRegister(values))
      .then(() => {
        setEmail(values.email)
        setRegisterStep('resend')
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message)
        }
      })
  }
  const onResendEmail = () => {
    dispatch(attemptResendConfirmation(email))
      .then(() => setRegisterStep('reset'))
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message)
        }
      })
  }

  const onReset = () => {
    dispatch(attemptResetRegister(email)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message)
      }
    })
  }
  function renderSwitch() {
    switch (registerStep) {
      case 'register':
        return (
          <>
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6"></div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="text-blueGray-400 text-center mb-3 font-bold">
                        <small>Sign up with credentials</small>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            First Name
                          </label>

                          <input
                            type="text"
                            name="firstName"
                            {...register('firstName', {
                              required: true
                            })}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            {...register('lastName', {
                              required: true
                            })}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Last Name"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            {...register('email', {
                              required: true
                            })}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            {...register('password', {
                              required: true,
                              minLength: 7
                            })}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Password"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            {...register('confirmPassword', {
                              required: true,
                              minLength: 7
                            })}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Confirm Password"
                          />
                        </div>

                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              {...register('customCheckLogin', {
                                required: true
                              })}
                              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                              I agree with the{' '}
                              <a
                                href="#pablo"
                                className="text-lightBlue-500"
                                onClick={(e) => e.preventDefault()}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Create Account
                          </button>
                          {serverError && (
                            <span style={{ color: 'red' }}>{serverError}</span>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      case 'resend':
        return (
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      A verification email has been sent.
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      Check you mailbox : {email}.
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          You have 12 hours to activate your account. It can take up to 15
                          min to receive our email.
                        </p>
                        <button
                          onClick={onResendEmail}
                          className="button font-normal text-lightBlue-500"
                        >
                          Did not receive the email? Click here to send again.
                        </button>
                        {serverError && (
                          <span style={{ color: 'red' }}>{serverError}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'reset':
        return (
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      Still not received an email?
                    </h3>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          If you want to be able to use the same username, reset the
                          registration :
                        </p>
                        <button
                          onClick={onReset}
                          className="button font-normal text-lightBlue-500"
                        >
                          Click here to reset the registration
                        </button>
                        {serverError && (
                          <span style={{ color: 'red' }}>{serverError}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        break
    }
  }
  return isAuth ? <Redirect to="/" /> : <Fragment>{renderSwitch()}</Fragment>
}
