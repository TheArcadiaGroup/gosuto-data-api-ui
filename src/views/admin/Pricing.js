import React, { useEffect, useState } from 'react'

import { getPacks, selectFreePlan } from 'api/pack'
import { createSubscription, cancelSubscription, updateSubscription } from 'api/payment'

import { useSelector } from 'react-redux'
import Modal from 'components/Modal'
// components

export default function Pricing() {
  const [packs, setPacks] = useState([])
  const [subscriptionData, setSubscriptionData] = useState(null)
  const [showModal, setShowModal] = useState({
    state: false,
    pack: {},
    subscriptionData: null
  })
  //const [selected, setShowModal] = useState(false)
  const { isAuth, user } = useSelector((state) => state.user)
  const generateSubscription = async (pack) => {
    if (user.subscriptionId) {
      updateSubscription(pack._id)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => {
          //window.location.reload()
        })
    } else {
      const res = await createSubscription(pack._id)

      const { subscriptionId, clientSecret } = res.data
      setSubscriptionData({ subscriptionId: subscriptionId, clientSecret: clientSecret })
      setShowModal({
        state: true,
        pack: pack,
        subscriptionData: { subscriptionId: subscriptionId, clientSecret: clientSecret }
      })
    }
  }
  function getFreePlan() {
    selectFreePlan()
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        //window.location.reload()
      })
  }
  const handleCancelSubscription = () => {
    cancelSubscription()
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        //window.location.reload()
      })
  }
  useEffect(() => {
    async function loadPacks() {
      const res = await getPacks()
      setPacks(res.data)
    }

    loadPacks()
  }, [setPacks])
  return (
    <>
      <div
        className="  h-full py-16 antialiased bg-primary-very-light font-sans"
        style={{}}
      >
        <div
          id="modal"
          class="flex flex-col  items-center lg:justify-center w-full w-full lg:px-10 py-12"
        ></div>
        <div className="flex flex-col items-center text-white">
          <h2 className="text-3xl font-bold text-black">Our Pricing</h2>
        </div>

        <section className="flex flex-col lg:flex-row items-start items-center lg:justify-center w-full w-full lg:px-10 py-12 mr-10">
          {packs.map((pack) => {
            if (pack._id === user.pack._id) {
              return (
                <article
                  className="filter drop-shadow w-full bg-white lg:w-custom w-4/5 mb-10 px-6 py-16 lg:-mt-6 text-white text-center rounded-lg filter drop-shadow"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #70aac7 0%, #0284c7 100%)',
                    marginRight: '20px'
                  }}
                  key={`pricing_${pack._id}`}
                >
                  <h5 className="font-bold text-base ">{pack.name}</h5>
                  <h2 className="font-bold pb-4 mt-2 border-b border-gray-100 flex justify-center">
                    {pack.free ? (
                      <span className="text-6xl "> FREE</span>
                    ) : (
                      <>
                        <span className="">$</span>
                        <span className="text-6xl "> {pack.price}</span>
                      </>
                    )}
                  </h2>
                  <ul className=" text-sm font-bold">
                    <li className="pt-4 pb-4 border-b border-gray-300">
                      {pack.nbProjects} Projects
                    </li>
                    <li className="pt-3 pb-4 border-b border-gray-300">
                      {pack.nbRequests.toLocaleString()} Requests
                    </li>
                    <li className="pt-4 pb-4 border-b border-gray-300">
                      Send up to 3 GB
                    </li>
                  </ul>
                  <button
                    className="uppercase text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 rounded-lg font-bold text-primary-very-light"
                    style={{
                      backgroundImage: 'linear-gradient(180deg, #70aac7 0%, #0284c7 100%)'
                    }}
                    onClick={() => {
                      handleCancelSubscription()
                    }}
                  >
                    {pack.free ? 'Current Plan' : 'unsubscribe'}
                  </button>
                </article>
              )
            } else {
              return (
                <article
                  className="mr-20 w-full bg-white w-4/5 lg:w-custom mb-10  lg:px-4 px-6 py-10 text-center text-primary-dark rounded-lg"
                  style={{
                    marginRight: '20px'
                  }}
                  key={`pricing_${pack._id}`}
                >
                  <h5 className="font-bold text-base">{pack.name}</h5>
                  <h2 className="pb-4 flex justify-center text-center font-bold border-b border-gray-300">
                    {pack.free ? (
                      <span className="text-6xl "> FREE</span>
                    ) : (
                      <>
                        <span className="">$</span>
                        <span className="text-6xl "> {pack.price} /mo</span>
                      </>
                    )}
                  </h2>
                  <ul className="text-sm font-bold">
                    <li className="pt-4 pb-4 border-b border-gray-300">
                      {pack.nbProjects} Projects
                    </li>
                    <li className="pt-3 pb-4 border-b border-gray-300">
                      {pack.nbRequests.toLocaleString()} Requests
                    </li>
                    <li className="pt-4 pb-4 border-b border-gray-300">
                      Send up to 3 GB
                    </li>
                  </ul>
                  {pack.free ? (
                    <button
                      style={{
                        backgroundImage:
                          'linear-gradient(180deg, #70aac7 0%, #0284c7 100%)',
                        color: 'white'
                      }}
                      onClick={getFreePlan}
                      className=" uppercase text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 font-bold text-primary-very-light rounded-lg"
                    >
                      SELECT PLAN
                    </button>
                  ) : (
                    <button
                      style={{
                        backgroundImage:
                          'linear-gradient(180deg, #70aac7 0%, #0284c7 100%)',
                        color: 'white',
                      }}
                      onClick={async () => await generateSubscription(pack)}
                      className=" uppercase text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 font-bold text-primary-very-light rounded-lg"
                    >
                      {user.subscriptionId ? 'update to this plan' : 'select plan'}
                    </button>
                  )}
                </article>
              )
            }
          })}
        </section>

        {showModal.state ? (
          <Modal
            onCancel={() => {
              setShowModal({ state: false, pack: {}, subscriptionData: null })
              window.location.reload()
            }}
            pack={showModal.pack}
            subscriptionData={showModal.subscriptionData}
          />
        ) : null}
      </div>
    </>
  )
}
