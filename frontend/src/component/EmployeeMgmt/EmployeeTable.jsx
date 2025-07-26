import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EmployeeTable = () => {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios.get("http://localhost:5000/api/employee-data").then((res) => {
      console.log(res);
      setData(res.data.data);
    }).catch((err) => {
      console.log(err);
    }) 
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  const handleEdit = (id) => {
    navigation(`/dashboard/edit-employee/${id}`);
  }

  const handleDelete = (id) => {
    axios.post(`http://localhost:5000/api/del-employee/${id}`).then((res) => {
      console.log(res);
      fetchData();
    }).catch((err) => {
      console.log(err);
    })
  }

  const data1 = [
    {
      sn: 1,
      employeename: "Sampanna",
      address: "ktm",
      designation: "Senior Developer",
      skills: "React, node.js"
    },
    {
      sn: 2,
      employeename: "Shine",
      address: "Uk",
      designation: "Junior Developer",
      skills: "Php, Dotnet"
    },
    {
      sn: 3,
      employeename: "Soni",
      address: "Itahari",
      designation: "Project Head",
      skills: "AI, ML"
    },
  ]

  return (
    <div className='p-4' style={{ backgroundColor: '#2E2E2E', minHeight: '100vh' }}>
      <div className='flex justify-between w-full'>
        <h1 className='text-4xl font-bold' style={{ color: '#F7E8D0' }}>Employee Management</h1>
        <Link to="/dashboard/add-employee">
          <button 
            className='rounded-md px-4 py-4 font-bold transition-colors duration-200 hover:opacity-90'
            style={{ 
              backgroundColor: '#8E3B46', 
              color: '#F7E8D0' 
            }}
          >
            Add Employee
          </button>
        </Link>
      </div>
      
      <div className='flex justify-center mt-6'>
        <input 
          type="search" 
          name="" 
          id="" 
          className='border-2 rounded-2xl w-96 p-3 focus:outline-none focus:ring-2 transition-all duration-200' 
          placeholder='Search employees...'
          style={{ 
            borderColor: '#8E3B46',
            backgroundColor: '#F7E8D0',
            color: '#2E2E2E'
          }}
        />
      </div>

      <div className="relative overflow-x-auto shadow-lg rounded-lg mt-8">
        <table className="w-full text-sm text-left">
          <thead 
            className="text-xs uppercase font-semibold"
            style={{ 
              backgroundColor: '#8E3B46', 
              color: '#F7E8D0' 
            }}
          >
            <tr>
              <th scope="col" className="px-6 py-4">
                S.N
              </th>
              <th scope="col" className="px-6 py-4">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-4">
                Address
              </th>
              <th scope="col" className="px-6 py-4">
                Designation
              </th>
              <th scope="col" className="px-6 py-4">
                Skills
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr 
                  key={index}
                  className="border-b transition-colors duration-200 hover:opacity-90"
                  style={{ 
                    backgroundColor: '#F7E8D0',
                    borderColor: '#8E3B46',
                    color: '#2E2E2E'
                  }}
                >
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 font-medium">
                    {item.full_name}
                  </td>
                  <td className="px-6 py-4">
                    {item.address}
                  </td>
                  <td className="px-6 py-4">
                    {item.designation}
                  </td>
                  <td className="px-6 py-4">
                    {item.skill_name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        className='rounded-md px-4 py-2 font-medium transition-all duration-200 hover:opacity-80 hover:scale-105'
                        style={{ 
                          backgroundColor: '#F4A259', 
                          color: '#2E2E2E' 
                        }}
                        onClick={() => handleEdit(item.userId)}
                      >
                        Edit
                      </button>
                      <button 
                        className='rounded-md px-4 py-2 font-medium transition-all duration-200 hover:opacity-80 hover:scale-105'
                        style={{ 
                          backgroundColor: '#8E3B46', 
                          color: '#F7E8D0' 
                        }}
                        onClick={() => handleDelete(item.userId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeTable