import React from 'react'
import DashboardTable from './DashboardTable'

export default function DeshboardContent({theading, tbody, title}) {
  return (
    <div className="">
        <div className={"page-title"}>
          {
            title?  <span> <h3>{title}</h3> 
            <hr/> <br/></span>  : null
          }
        </div>
      <div className="">
        <DashboardTable thead={theading} tbody={tbody}  />
      </div>
    </div>
  )
}
