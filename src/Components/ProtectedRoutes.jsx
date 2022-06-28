import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';



function ProtectedRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  const isAuth = !isLoggedIn;
  return isAuth ? <Outlet /> : <Navigate to='/adminlogin' />

}

export default ProtectedRoutes