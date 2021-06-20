import React from 'react'
import Chart from 'chart.js'
import { getStatForbarChart } from 'api/stat'
export default function CardLineChart() {
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    async function LoadData() {
      const res = await getStatForbarChart()
      setData(res.data)
    }
    LoadData()
  }, [])

  React.useEffect(() => {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const td = today.getDate()
    const realMonth = parseInt(month, 10) - 1
    let weekDaysObj = new Array()
    for (var i = td; i > td - 7; i--) {
      var d = new Date(year, realMonth, i)
      weekDaysObj.push(`${d.getDate()}-${weekday[d.getDay()]}`)
    }
    var config = {
      type: 'line',
      data: {
        labels: weekDaysObj.reverse(),
        datasets: [
          {
            label: 'This Week',
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: data,
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Sales Charts',
          fontColor: 'white'
        },
        legend: {
          labels: {
            fontColor: 'white'
          },
          align: 'end',
          position: 'bottom'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)'
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'white'
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(0, 0, 0, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)'
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
                fontColor: 'white'
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: 'rgba(255, 255, 255, 0.15)',
                zeroLineColor: 'rgba(33, 37, 41, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
              }
            }
          ]
        }
      }
    }
    var ctx = document.getElementById('line-chart').getContext('2d')
    window.myLine = new Chart(ctx, config)
  }, [data])
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Requests</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  )
}
