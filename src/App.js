import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/signup';
import About from './components/About';
import NoteState from './context/notes/Notestate';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from './components/Alert';
import { useState } from 'react';


function App() {


    const [alert, setAlert] =  useState(null)
  
    const showAlert = (massege, type)=>{
      setAlert({
        msg: massege,
        type: type,
      });
      setTimeout(() => {
        setAlert(null)
      }, 1500);
    }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert  alert= {alert}/>


          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About/>}/>
            <Route path='/login' element={<Login showAlert={showAlert} />}/>
            <Route path='/signup' element={<Signup showAlert={showAlert} />}/>



          </Routes>




        </Router>
      </NoteState>
    </>
  );
}

export default App;
