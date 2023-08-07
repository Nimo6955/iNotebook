import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMzlkZDJiNmU3MmMxNmM4NjUyZWE5In0sImlhdCI6MTY4OTUwNDgzNX0.8C4xT5Dx9ruuYQP7F9SIQCB-NLdUhCRFYqOXmEfY31k'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })


    });
    const json = await response.json();
    //   console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      // console.log(json.authtoken);
      
      navigate('/')
      props.showAlert("Logged In successfully", "success")
      
    }
    else {
      props.showAlert("Invalid Details", "danger")
    }
  }
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group mx-5" >
          <label htmlFor="Email1">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} />
        </div>
        <div className="form-group mx-5">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" value={credentials.password} id="password" name="password" placeholder="Password" onChange={onchange} />
        </div>
        <button type="submit" className="btn btn-primary mx-5" >Submit</button>
      </form>
    </>
  )
}

export default Login