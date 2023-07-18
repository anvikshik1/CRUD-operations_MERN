import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Update() {
  const [name,setName] =useState('');
  const [email,setEmail] =useState('');
  const [age,setAge] =useState();
  const [error,setError] =useState();

  const {id} = useParams();
  const navigate = useNavigate();

 

  const getSingleUser = async () => {
    const res = await fetch(`http://localhost:5000/${id}`)
    const result = await res.json();

    if(!res.ok) {
      setError(result.error);
    };
    if(res.ok){
      console.log(result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
      setError("");
    }
  };
  
  useEffect(() =>{
    getSingleUser()
  },[])

  const handleEdit = async (e) => {
    e.preventDefault()
    const updateUser = {name,email,age};
    const res = await fetch(`http://localhost:5000/${id}`,{
      method:"PATCH",
      body: JSON.stringify(updateUser),
      headers:{
        "content-type" : "application/json"
      }
    })
    const result = await res.json();
    
    if(!res.ok) {
      setError(result.error);
    };
    if(res.ok){
      setError("");
      navigate("/all")
    };
  }

  return (
    <div className='container my-2'>
    {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center'>Edit the data</h2>
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputPassword1" 
            onChange={(e) =>setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={(e) =>setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Age</label>
          <input type="number" className="form-control" id="exampleInputPassword1"
            onChange={(e) =>setAge(e.target.value)}
            value={age}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Update