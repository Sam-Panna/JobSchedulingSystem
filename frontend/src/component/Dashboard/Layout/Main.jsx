import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div className='flex w-full '>
      <div className='h-screen w-[16rem] fixed'>
        <Sidebar />
      </div>
      <div className='flex flex-col w-full shadow-2xl bg-gradient-to-r from-[#8E3B46] to-[#A9645B]'>
        <div className='w-full h-[4rem] shadow-2xl'>
          <Topbar />
        </div>
        <div className='h-[calc(100vh-8rem)] ml-[16rem]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Main