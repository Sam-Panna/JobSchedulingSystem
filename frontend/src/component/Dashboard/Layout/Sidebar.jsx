import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../image/logo.png'
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className='flex flex-col h-full w-full p-2 bg-[#263437] text-[#E8DFE0] items-center gap-2'>
      <div className=' w-[60%]  h-[5rem]  '><img src={logo} alt="logo" className='w-full h-full ' /></div>
      <div className='flex justify-center '>
        <input type="search" name="" id="" className='border-2 rounded-lg w-[100%] p-1 bg-white text-[#263437]' placeholder='Search'  />
      </div>
        <ul className='flex flex-col gap-1.5'>
            <li className='flex items-center gap-2'><MdDashboard/><Link to= "/dashboard">Dashboard</Link></li>
            <li className='flex items-center gap-2'><IoIosPeople/><Link to= "/dashboard/employee-table">Employee Management</Link></li>
            <li className='flex items-center gap-2'><FaClipboardList/>Task Management</li>
            <li className='flex items-center gap-2'><IoBarChart />Performance Report</li>
            <li className='flex items-center gap-2'><FaUserCircle />Profile</li>
        </ul>
        
    </div>
  )
}

export default Sidebar