import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import '../App';

function Read() {
  const [error,setError] = useState();
  const [data,setData] = useState();

  const getData = async () => {
    const res = await fetch("http://localhost:5000/")
    const result = await res.json();
    if(!res.ok) {
      setError(result.error);
    };
    if(res.ok){
      // console.log(result);
      setData(result)
      setError("");
    };
  }
  useEffect(() =>{
    getData()
  },[])

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/${id}`,{method:"DELETE"})
    const result = await res.json();
    
    if(!res.ok) {
      setError(result.error);
    };
    if(res.ok){
      setError("Delete successfully");
      setTimeout(() => {
        setError("")
        getData();
      },2000)
      
    };
  }

  return (
    <div className='container my-2'>
    {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center text-light'>All Data</h2>
      <div className='row'>
      {data?.map((data,index) =>{
        return(
          <div className='col-3 mb-4 mt-5' key={index}>
            <div className="card boxes">
              <div className="card-body">
                <h5 className="card-title text-light">{data.name}</h5>
                <h6 className="card-subtitle mb-2 text-light">{data.email}</h6>
                <p className="card-text text-light">{data.age}</p>
                <button type="button" class="btn btn-danger me-2" onClick={() => handleDelete(data._id)}>Delete</button>
                 <Link class="btn btn-primary" to={`/${data._id}`}> Edit</Link> 
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Read