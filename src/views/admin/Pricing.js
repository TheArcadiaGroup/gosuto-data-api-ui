import React, { useEffect, useState } from 'react'
import { getPacks } from 'api/pack'
import { useSelector } from 'react-redux'
import Modal from 'components/Modal'
// components

export default function Pricing() {
  const [packs, setPacks] = useState([])
  const [showModal, setShowModal] = useState({ state: false, pack: {} })
  //const [selected, setShowModal] = useState(false)
  const { isAuth, user } = useSelector((state) => state.user)
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
        style={{ marginTop: 150 }}
      >
        <div
          id="modal"
          class="flex flex-col  items-center lg:justify-center w-full w-full lg:px-10 py-12"
        ></div>
        <div className="flex flex-col items-center mb-12 text-white">
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
                      {pack.nbRequests} Projects
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
                    disabled
                  >
                    Current PLAN
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
                      {pack.nbRequests} Projects
                    </li>
                    <li className="pt-4 pb-4 border-b border-gray-300">
                      Send up to 3 GB
                    </li>
                  </ul>
                  <button
                    style={{
                      backgroundImage: 'linear-gradient(180deg, #70aac7 0%, #0284c7 100%)'
                    }}
                    onClick={() => setShowModal({ state: true, pack: pack })}
                    className=" uppercase text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 font-bold text-primary-very-light rounded-lg"
                  >
                    SELECT PLAN
                  </button>
                </article>
              )
            }
          })}
        </section>

        {showModal.state ? (
          <Modal
            onCancel={() => setShowModal({ state: false, pack: {} })}
            pack={showModal.pack}
          />
        ) : null}
      </div>
    </>
  )
}
