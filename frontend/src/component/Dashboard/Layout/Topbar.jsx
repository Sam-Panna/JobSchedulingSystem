import React from 'react'
import { GoBellFill } from "react-icons/go";


const Topbar = () => {
  return (
    <div className='flex gap-3 justify-end items-center p-2 '>
      <div className=''><GoBellFill /></div>
      <div className=''>
          <h2>Sam</h2>
      </div>
      <div className='border-2 border-black size-10'><img src="" alt="hhjjjj" /></div>
    </div>
  )
}

export default Topbar