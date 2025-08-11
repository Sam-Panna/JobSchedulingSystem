import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../image/logo.png'
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";

const Sidebar = () => {
  return (
    <div className='flex flex-col h-full w-full p-2 bg-[#2B1A1D] text-[#E8DFE0] items-center gap-2'>
      <div className=' w-[60%]  h-[5rem]  '><img src={logo} alt="logo" className='w-full h-full ' /></div>
      <h1>Employee</h1>
      <div className='flex justify-center '>
        <input type="search" name="" id="" className='border-2 rounded-lg w-[100%] p-1 bg-white text-[#263437]' placeholder='Search' />
      </div>
      <ul className='flex flex-col gap-1.5'>
        <li className='flex items-center gap-2'><MdDashboard /><Link to="/employee-dashboard">Dashboard</Link></li>
        <li className='flex items-center gap-2'><GoTasklist className='text-[1.3rem]' /><Link to="/employee-dashboard/mytasks">My Tasks</Link></li>
        
        <li className='flex items-center gap-2'><IoBarChart />Performance Report</li>
        <li className='flex items-center gap-2'><FaUserCircle /><Link to= "/employee-dashboard/employee-profile">Profile</Link></li>
      </ul>

    </div>
  )
}

export default Sidebar