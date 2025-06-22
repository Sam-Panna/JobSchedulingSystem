import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
  const navigation =useNavigate();

  const[data, setData] = useState({
    username:"",
    password_hash:""
  })
  const{ id} = useParams();
  console.log(parseInt(id));

  
  useEffect(() =>{
    axios.get(`http://localhost:5000/api/single-employee/${parseInt(id)}`).then((res)=>{
      setData(res.data.result[0]);
      
      
    }).catch((err) =>{
      console.log(err);
      
    })
  }, [])
  console.log(data, "mmm");

  const handleChange= (e)=>{
    setData({...data, [e.target.name]: e.target.value})
    console.log(data);
    

  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/edit-employee/${parseInt(id)}`, data).then((res) =>{
      console.log(res.data.message);
      navigation("/dashboard/employee-table");
      
    }).catch((err) =>{
      console.log(err);
      
    })

  }
  

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input name='username' type="email" value={data.username} onChange={handleChange} />
        <input name='password_hash' type='text' placeholder='enter new password' onChange={handleChange}/>
        <button type='submit ' >Submit</button>
      </form>
    </div>
  )
}

export default EditEmployee