import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa'
import { Container, DashBoard } from '../Styled';
import Header from '../Header';
import axios from 'axios';


function Dashboard() {

  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const name = localStorage.getItem('name');


  useEffect(() => {
    setLoading(true);

    axios.get('https://heroku-cbt.herokuapp.com/api/v1/exam', {
      crossDomain: true,
      // withCredentials: true,
      headers: {
        'accept': 'application/json',
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      auth:{
        username: JSON.parse(username),
        password: JSON.parse(password)
      }
    }).then((response) => {
      setData(response.data);
      setLoading(false);
      console.log(response)
      setMsg("")
     
    }).catch((error) => {
      setLoading(false)
      // setMsg(error.message);
      // toast.error(error.message, { theme: "colored" });
      console.error(error)
    })
  }, [])


  return (

    <Container>
      <Header info='Dashboard' />
      <DashBoard>
        <div className='dashhead'>
          <div>
            <ul>
              <li><NavLink
                style={({ isActive }) => {
                  return {
                    background: isActive ? 'white' : '',
                    color: isActive ? '#103979' : '',
                    borderBottomColor: isActive ? '#103070' : 'none',
                    borderWidth: isActive ? '2px' : '0px',

                  }
                }}
                to='/dashboard/getalltest' >Exams</NavLink>  </li>
              <li><NavLink
                style={({ isActive }) => {
                  return {
                    background: isActive ? 'white' : '',
                    color: isActive ? '#103979' : '',
                    borderBottomColor: isActive ? '#103070' : 'none',
                    borderWidth: isActive ? '2px' : '0px'
                  }
                }} to='/dashboard/getalluser'>All User </NavLink></li>
              <li><NavLink
                style={({ isActive }) => {
                  return {
                    background: isActive ? 'white' : '',
                    color: isActive ? '#103979' : '',
                    borderBottomColor: isActive ? '#103070' : 'none',
                    borderWidth: isActive ? '2px' : '0px',

                  }
                }} to='/'>CreateUser</NavLink></li>
            </ul>
          </div>

          <div className='headContent'>
            <div>
              <h2>{/* localStorage.getItem('email') */} </h2>
              <h2>{JSON.parse(name).toUpperCase()}</h2>
            </div>

            <div>
              <p>Scheduled Exams</p>
              <p>{data.length}</p>
            </div>

            <div>
              <p>Capacity</p>
              <p>200 Persons</p>
            </div>

            <Link to='/createexam' className='newExamBtn' ><FaPlusSquare />  New Exam </Link>

          </div>
        </div>

        <div className='dashbody'>
          <Outlet />
        </div>

      </DashBoard>
    </Container>


  )
}

export default Dashboard