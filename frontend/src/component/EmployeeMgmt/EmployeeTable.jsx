import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeTable = () => {
  const data = [
    {
      sn : 1,
      employeename : "Sampanna",
      address : "ktm",
      designation : "Senior Developer",
      skills : "React, node.js"

    },
     {
      sn : 2,
      employeename : "Shine",
      address : "Uk",
      designation : "Junior Developer",
      skills : "Php, Dotnet"

    },
     {
      sn : 3,
      employeename : "Soni",
      address : "Itahari",
      designation : "Project Head",
      skills : "AI, ML"

    },
  ]
  return (
    <div className='p-4'>
      <div className='flex justify-between w-full'>
        <h1 className='text-4xl text-gray-800 font-b'>Employee Management</h1>
        <Link to= "/dashboard/add-employee"><button className='bg-[#8D9B6A] rounded-md px-4 py-4 text-gray-800 font-bold'>Add Employee</button></Link>
      </div>
      <div className='flex justify-center '>
        <input type="search" name="" id="" className='border-2 rounded-2xl w-2xl p-1.5' placeholder='Search'  />
      </div>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                S.N
              </th>
              <th scope="col" class="px-6 py-3">
                Employee name
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Designation
              </th>
              <th scope="col" class="px-6 py-3">
                Skills
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index)=>{
                return(
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.sn}
              </th>
              <td class="px-6 py-4">
                {item.employeename}
              </td>
              <td class="px-6 py-4">
                {item.address}
              </td>
              <td class="px-6 py-4">
                {item.designation}
              </td>
              <td class="px-6 py-4">
               {item.skills}
              </td>
              
               <td class="px-6 py-4 flex gap-2 text-gray-800 ">
                <button className='bg-blue-500 rounded-md px-4 py-1'>Edit</button>
                <button className='bg-red-600 rounded-md px-4 py-1'>Delete</button>
                
              </td>
            </tr>
                )
              })
            }
          
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default EmployeeTable