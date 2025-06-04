import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex h-full w-full border-2 border-black bg-[#E8DFE0]'>
        <ul className='flex flex-col'>
            <Link to= "/dashboard">Dashboard</Link>
            <Link to= "/dashboard/employee-table">Employee Management</Link>
            <li>Task Management</li>
            <li>Performance Report</li>
            <li>Profile</li>
        </ul>
        
    </div>
  )
}

export default Sidebar