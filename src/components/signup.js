import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
      <div className='sign-up-Card'>
      <h3 style={{textAlign:'center',marginBottom:'40px'}}>Sign Up</h3>

      <form className='mx-5' onSubmit={handleOnSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" onChange={onchange} id="name" name='name' aria-describedby="emailHelp" placeholder="Name" />
        </div>
        <div className="form-group">
          <input type="email" className="form-control" onChange={onchange} id="email" name='email' aria-describedby="emailHelp" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" onChange={onchange} id="password" name='password' placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" onChange={onchange} id="cpassword" name='cpassword' placeholder="Confirm Password" minLength={5} required />
        </div>

        <button style={{marginBottom:'20px'}} type="submit" className="btn btn-primary">Submit</button>
        <p style={{textAlign:'center'}}>Already have an Account ?<span><Link to='/login'> Log in</Link></span></p>
      </form>

      </div>
    </>
  )
}

export default Signup