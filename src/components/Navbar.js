import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
    const homeIcon = document.getElementById('home-display')
    homeIcon.style.display = 'none'
    const AboutIcon = document.getElementById('About-display')
    AboutIcon.style.display = 'none'

  }
  let location = useLocation();

  const HomeAboutDisplay = () => {

    if (localStorage.getItem('token')) {
      const homeIcon = document.getElementById('home-display')
      homeIcon.style.display = 'block'
      // const AboutIcon = document.getElementById('About-display')
      // AboutIcon.style.display = 'block'
    }
  }

  useEffect(() => {
    HomeAboutDisplay();
  }, [location]);

  return (
    <>

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} id='home-display' aria-current="page" to="/">Home</Link>
                </li>
                {/* <li className="nav-item">
                  <Link style={{display:'none'}} className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} id='About-display' to="/about">About</Link>

                </li> */}
              </ul>
          </div>

              {!localStorage.getItem('token') ? <div>
              </div> : <button onClick={handleLogOut} className='btn btn-primary btn-sm '>Log Out</button>}
    
            </div>
        </nav>
      

    </>
  )
}

export default Navbar