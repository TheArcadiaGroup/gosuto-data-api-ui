import React from 'react'

// components

import UsersCardTable from 'components/Cards/UsersCardTable'

export default function Users() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <UsersCardTable />
        </div>
      </div>
    </>
  )
}
