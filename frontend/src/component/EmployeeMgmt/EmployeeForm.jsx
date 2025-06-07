import React from 'react'

const EmployeeForm = () => {
  return (
    <div className='w-full flex justify-center items-center h-full'>
        <form action="" className='flex flex-col w-[33rem] gap-4 border-2 shadow-2xl h-[70%] rounded-md justify-center p-8'>
            <h1 className='text-4xl font-bold'>ADD NEW EMPLOYEE</h1>
            <input type="text" placeholder='Enter employee full name'className='border-2 rounded-md p-2' />
            <input type="text" placeholder='Enter employee address' className='border-2 rounded-md p-2'/>
            <input type="text" placeholder='Enter employee designation'className='border-2 rounded-md p-2'/>
            <input type="text" placeholder='Enter employee skills'className='border-2 rounded-md p-2'/>
            <button className='bg-[#8D9B6A] p-2'>Submit</button>

        </form>
    </div>
  )
}

export default EmployeeForm