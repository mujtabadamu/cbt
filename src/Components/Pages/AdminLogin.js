import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataContext';
import { Button, Container, DivError, FlexDiv, Input, } from '../Styled';
import ErrorIcon from '../ErrorIcon'
import { AuthContext } from '../../Context/AuthContext';
import Header from '../Header'

function AdminLogin() {

  const { navigate } = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const data = { email, password };
    const jsonData = JSON.stringify(data);
    // console.log("JSON RECORD", jsonData)
    setLoading(true)

    if (email) {
      if (email.includes('@')) {
        if (password) {
          if (password.length >= 6 && password.length <= 16) {

            axios.post('https://heroku-cbt.herokuapp.com/api/v1/auth/login', jsonData,
              {
                headers: {
                  'accept': 'application/json',
                  "Content-type": "application/json;charset=UTF-8",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'POST',
                  'Access-Control-Allow-Headers': 'Content-Type',
                }
              })
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Login Successfully...");
                  window.localStorage.setItem('email', JSON.stringify(data.email));
                  window.localStorage.setItem('password', JSON.stringify(data.password));
                  window.localStorage.setItem('name', JSON.stringify(response.data.name));
                  window.localStorage.setItem('role', JSON.stringify(response.data.role));
                  // console.log("USER INFO", response)
                  navigate('/dashboard');
                }
                setLoading(false)

              }).catch((error) => {
                console.log("Erorr >>>>>>>>>>>>.", error.message)
                toast.error(error.message, { theme: "colored" });
                setLoading(false)
                if (error.response.status === 401) {
                  toast.error('Invaild Username or Password', { theme: "colored" });
                }
                // toast.error(error.response.data.error_message, { theme: "colored" });
              })
          } else {
            toast.error('password must be between 6 and 16 characters', { theme: "colored" });
            setLoading(false)
          }
        } else {
          setLoading(false)
        }
      } else {
        toast.error('Invalid Email Address', { theme: "colored" });
        setLoading(false)
      }

    } else {
      setLoading(false)
    }


  }



  return (
    <Container>
      <Header info='New Registration' />
      <FlexDiv>
        <div>
          {loading && <p>Loading....</p>}
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <h2>Login </h2>
            <label>
              Email
              <DivError>
                {submitted && !email ? <div><span className='error'>Email cannot be empty</span> <ErrorIcon /> </div> :
                  submitted && !email.includes('@') ? <div className='error'>Invalid Email</div> :
                    null}
              </DivError>
              <Input
                type='text'
                style={{ borderColor: submitted && !email ? 'red' : '' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
              />
            </label>


            <label>Password
              <DivError>
                {submitted && !password ? <div> <span className='error'>Password cannot be empty</span>  <ErrorIcon />  </div> : null}
              </DivError>
              <Input
                type='password'
                style={{ borderColor: submitted && !email ? 'red' : '' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='insert password here'
              />
            </label>
            <Button>Submit</Button>

            <Link to='/createuser'> New User, Sign Up here</Link>

          </form>

        </div>
      </FlexDiv>


    </Container>
  )
}

export default AdminLogin
