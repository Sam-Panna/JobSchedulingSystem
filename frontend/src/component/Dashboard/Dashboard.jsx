import React from 'react'

const Dashboard = () => {
  return (
    <div className='h-[calc(100vh-5rem)] border-black border-2 w-full p-2'>
        <h1 className='text-4xl text-gray-800 textfont font-bold'>WELCOME <span className='font-bold textfont'>SAMPANNA</span></h1>
        <div className=' w-full flex  justify-between gap-2'>
            <div className='border-black border-2 h-28 w-full'>Total Tasks</div>
            <div className='border-black border-2 h-28 w-full'>Pending Tasks</div>
            <div className='border-black border-2 h-28 w-full' >Total Employees</div>
            <div className='border-black border-2 h-28 w-full'>Completed</div>
        </div>
        
        <div className=' w-full flex h-[calc(100%-8rem)] justify-between gap-3'>

        <div className='border-black border-2 h-[90%] w-full p-4'>
            <h1>Workload Chart</h1>
            <div className='border-black border-2 h-[90%]'>

            </div>
        </div>
        <div className='border-black border-2 h-[90%] w-full p-4 '>
            <h1>AI Smart Assignment</h1>
            <div className='border-black border-2 h-[80%]'>

            </div>

            <div className='flex justify-center w-full'>
            <button className='  p-3 border bg-amber-300 border-white rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md'>Assign Task</button>

            </div>


        </div>
        </div>
        
    </div>
  )
}

export default Dashboard


