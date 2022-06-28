import React from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'


function Dash() {

    <Route path='/dash/:examid' element={Dash} /> // inside your app.js or where your routes are located

    
    const navigate = useNavigate();
  return (
    <div>
         {navigate("/dashboard", {state: 'FIP'})}  {/* use this inside your submit function*/}   
    </div>
  )
}

export default Dash
