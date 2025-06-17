import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const EmployeeForm = () => {
  const[data, setData] = useState({
    full_name : '',
    username : '',
    address: '',
    designation: '',
    skills : ''

  });

  const handleChange= (e)=>{
    setData({...data, [e.target.name]: e.target.value})
    console.log(data);
    

  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await axios.post('http://localhost:5000/api/addemployees', data).then((res) =>{
      console.log(res.data.message);
      
    }).catch((err) =>{
      console.log(err);
      
    })

  }

  return (
    <div onSubmit={handleSubmit} className='w-full flex justify-center items-center h-full'>
        <form action="" className='flex flex-col w-[33rem] gap-4 border-2 shadow-2xl rounded-md justify-center p-8'>
            <h1 className='text-4xl font-bold'>ADD NEW EMPLOYEE</h1>
            <input name='full_name' type="text" onChange={handleChange} placeholder='Enter employee full name'className='border-2 rounded-md p-2' />
             <input name='username' type="text" onChange={handleChange} placeholder='Enter your username'className='border-2 rounded-md p-2' />
            <input name='address'type="text" onChange={handleChange} placeholder='Enter employee address' className='border-2 rounded-md p-2'/>
            <input name='designation' type="text" onChange={handleChange} placeholder='Enter employee designation'className='border-2 rounded-md p-2'/>
            <input name='skills'type="text" onChange={handleChange} placeholder='Enter employee skills'className='border-2 rounded-md p-2'/>
           
            <button className='bg-[#8D9B6A] p-2' type='submit'>Submit</button>

        </form>
    </div>
  )
}

export default EmployeeForm