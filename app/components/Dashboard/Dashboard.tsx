import React from 'react'
import { Quote } from './Quote'
import Coming from './Coming'
import Cards from './Cards'
import DailyProblem from './DailyProblem'
import LatestProblemsTable from './LatestProblemsTable'
import LatestSubmissionsTable from './LasestSubmissionsTable'

function Dashboard() {
  return (
    <div className="px-4">
      <div className=" grid grid-cols-1 md:grid-cols-9 ">
        <div className=" col-span-1 md:col-span-6">
        <Quote />
        </div>
        <div className=" col-span-1 md:col-span-3 py-4">
          <Coming />
        </div>
      </div>
      <Cards />
      <DailyProblem/>
      <LatestProblemsTable/>
      <LatestSubmissionsTable/>
    </div>
  )
}

export default Dashboard