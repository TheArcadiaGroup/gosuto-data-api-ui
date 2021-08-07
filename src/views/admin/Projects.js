import React from 'react'

// components

import CardProjects from 'components/Cards/CardProjects.js'

export default function Projects() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardProjects />
        </div>
      </div>
    </>
  )
}
