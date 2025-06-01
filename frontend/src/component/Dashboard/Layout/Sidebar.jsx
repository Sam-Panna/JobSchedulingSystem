import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex h-full w-full border-2 border-black bg-[#E8DFE0]'>
        <ul className='flex flex-col'>
            <li>Dashboard</li>
            <li>Employee Management</li>
            <li>Task Management</li>
            <li>Performance Report</li>
            <li>Profile</li>
        </ul>
        
    </div>
  )
}

export default Sidebar