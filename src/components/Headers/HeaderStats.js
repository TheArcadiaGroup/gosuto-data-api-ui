import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPack } from '../../api/pack'
// components

import CardStats from 'components/Cards/CardStats.js'
import { getProjects } from 'api/project'
import { getAllToday } from 'api/request'

export default function HeaderStats() {
  const { isAuth, user } = useSelector((state) => state.user)
  const [projects, setProjects] = useState(0)
  const [nbRequests, setNbRequests] = useState(0)
  useEffect(() => {
    async function loadProjects() {
      const res = await getProjects()
      setProjects(res.data.length)
    }
    loadProjects()
    async function loadRequests() {
      const res = await getAllToday()
      setNbRequests(res.data.length)
    }
    loadRequests()
  }, [])
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CURRENT PLAN"
                  statTitle={user.pack.name}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Projects"
                  statTitle={`${projects} / ${user.pack.nbProjects}`}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Requests Today"
                  statTitle={`${nbRequests} / ${user.pack.nbRequests}`}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
