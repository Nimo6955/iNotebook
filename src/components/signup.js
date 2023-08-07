import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {

  const [credentials, setCredentials] = useState({email: "", password : "", cpassword: "", name: ""})
  let navigate = useNavigate()

  const handleOnSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password} = credentials
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMzlkZDJiNmU3MmMxNmM4NjUyZWE5In0sImlhdCI6MTY4OTUwNDgzNX0.8C4xT5Dx9ruuYQP7F9SIQCB-NLdUhCRFYqOXmEfY31k'
          },
          body: JSON.stringify({ email, name, password })
    
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          localStorage.setItem('token', json.authtoken);
          navigate('/')
          props.showAlert("Accout Created successfully", "success")
        }
        else{
          props.showAlert("Invalid credentials", "danger")
        }
  }
  const onchange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <>

      <form className='mx-5' onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" onChange={onchange} id="name" name='name' aria-describedby="emailHelp" placeholder="Enter Name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" onChange={onchange} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" onChange={onchange} id="password" name='password' placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">confirm Password</label>
          <input type="password" className="form-control" onChange={onchange} id="cpassword" name='cpassword' placeholder="Password" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </>
  )
}

export default Signup