import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components

import CardStats from 'components/Cards/CardStats.js'
import { getStat } from 'api/stat'
import { attemptGetUser } from 'store/thunks/user'

export default function HeaderStats() {
  const { isAuth, user } = useSelector((state) => state.user)
  const [stat, setStat] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadStat() {
      const res = await getStat()
      let yesterdayRequests =
        res.data.nbRequestsYesterday === 0 ? 1 : res.data.nbRequestsYesterday
      const perf =
        (res.data.nbRequestsToday - res.data.nbRequestsYesterday) / yesterdayRequests
      res.data.perf = perf
      setStat(res.data)
    }
    loadStat()
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
                  statTitle={(user.pack) && user.pack.name}
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
                  statTitle={(user.pack && user.pack.nbRequests) && `${stat && stat.nbProjects} / ${user.pack.nbProjects}`}
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
                  statTitle={(stat && user.pack.nbRequests) && `${stat.nbRequestsToday} / ${user.pack.nbRequests}`}
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
                  statSubtitle="Requests Yesterday"
                  statTitle={(stat) && `${stat.nbRequestsYesterday
                    } Requests Yesterday`}
                  showStat={true}
                  statArrow={stat && stat.perf > 0 ? 'up' : 'down'}
                  statPercent={`${stat && stat.perf && (stat.perf * 100).toFixed(2)}`}
                  statPercentColor={
                    stat && stat.perf > 0 ? 'text-emerald-500' : 'text-red-500'
                  }
                  statDescripiron="Since yesterday"
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
