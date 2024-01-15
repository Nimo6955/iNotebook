import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  let location = useLocation();


  return (
    <>

        <nav className="navbar navbar-expand-lg" style={{background: 'black',position: 'fixed', top: '0px',width: '100%',zIndex:'10'}}>
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              
          </div>

              {!localStorage.getItem('token') ? <div>
              </div> : <button onClick={handleLogOut} className='submitBtn'>Log Out</button>}
    
            </div>
        </nav>
      

    </>
  )
}

export default Navbar