import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App';

function Create() {
  const [name,setName] =useState('');
  const [email,setEmail] =useState('');
  const [age,setAge] =useState();
  const [error,setError] =useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const addUser = {name,email,age};
    const res = await fetch("http://localhost:5000/",{
      method:"POST",
      body: JSON.stringify(addUser),
      headers:{
        "content-type" : "application/json"
      }
    })
    const result = await res.json();
    
    if(!res.ok) {
      setError(result.error);
    };
    if(res.ok){
      console.log(result);
      setName("");
      setEmail("");
      setAge();
      setError("");
      navigate("/all")
    };
  }

  return (
    <div className='container my-2 col-5'>
    {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center text-light'>Enter The Data</h2>
      <form onSubmit={handleSubmit} className='mt-5'>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label text-light">Name</label>
          <input type="text" className="form-control" id="exampleInputPassword1" 
            onChange={(e) =>setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label text-light">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={(e) =>setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label text-light">Age</label>
          <input type="number" className="form-control" id="exampleInputPassword1"
            onChange={(e) =>setAge(e.target.value)}
            value={age}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  )
}

export default Create