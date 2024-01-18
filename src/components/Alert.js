import React from 'react'
import { useLocation } from 'react-router-dom';


 function Alert(props) {
  let location = useLocation();

  return (
    <div style={{height: '50px',background: '#0b0c10',marginTop: '55px'}} >
    {props.alert && <div>
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{(props.alert.type) === "danger" ? "warning" : (props.alert.type)}</strong>: {props.alert.msg}
        </div>
    </div>}
    </div>
  )
}

export default Alert