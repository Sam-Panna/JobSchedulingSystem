import React from 'react'
import { GoBellFill } from "react-icons/go";
import { IoLogOut } from "react-icons/io5";


const Topbar = () => {
  return (
    <div className='flex gap-3 justify-end items-center p-2 '>
      <div className=''><GoBellFill /></div>
      <div className=''>
          <h2>Sam</h2>
      </div>
      <div className='border-2 border-black size-10'> <img
          src="https://ui-avatars.com/api/?name=Sam"
          alt="User avatar"
        />
        </div>
        <IoLogOut className='text-2xl hover:text-red-700 cursor-pointer'/>
    </div>
  )
}

export default Topbar