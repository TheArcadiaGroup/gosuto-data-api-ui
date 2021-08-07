import React, { Fragment, useEffect } from 'react'
import Portal from './Portal'
import AppWrapper from 'components/Payment/CheckoutForm'

const Modal = ({ onCancel, pack, subscriptionData }) => {
  useEffect(() => {})
  return (
    <Portal>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={onCancel} />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content */}
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            style={{ width: '500px' }}
          >
            {/*header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">Payment for the {pack.name} Plan</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onCancel}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body */}
            <div className="relative p-6 flex-auto">
              <AppWrapper pack={pack} subscriptionData={subscriptionData} />
            </div>
            {/*footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: 'all .15s ease' }}
                onClick={onCancel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Modal
