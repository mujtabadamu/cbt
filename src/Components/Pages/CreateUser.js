import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import ErrorIcon from '../ErrorIcon';
import { Button, Container, DivError, FlexDiv, Input } from '../Styled';
import Header from '../Header';
import { DataContext } from '../../Context/DataContext';

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { navigate } = useContext(DataContext)

  const url = "https://heroku-cbt.herokuapp.com/api/v1/auth/register";
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmitted(true)
    const data = { name, email, password, role }
    const jsonData = JSON.stringify(data); //Converting data into a json format 
    console.log(jsonData)

    if (email) {
      if (email.includes('@')) {
        if (password) {
          if (password.length >= 6 && password.length <= 16) {
            if (role) {
              console.log(data)
             await axios.post(url, jsonData,
                {
                  headers: {
                    'accept': 'application/json',
                    "Content-type": "application/json;charset=UTF-8",
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST'
                  }
                })
                .then((response) => {
                  if (response.status === 201) {
                    toast.success("New User Created Successfully...")
                    navigate('/adminlogin')
                  }
                  setLoading(false)
                })
                .catch((error) => {
                  // toast.error(error.message, { theme: "colored" }); //only if no internet connection
                  setLoading(false)
                  if (error.response.status === 409) {
                    toast.error("User Aleardy Exits");
                    setLoading(false)
                  }
                  // toast.error(error.response.data.error_message);
                  setLoading(false)
                  setMsg(error.response.data.error_message);
                })

            } else {
              toast.error('Role can not be empty', { theme: "colored" });
              setLoading(false)
            }
          } else {
            toast.error('password must be between 6 and 16 characters', { theme: "colored" });
            setLoading(false)
          }
        }
      } else {
        toast.error('Invalid Email', { theme: "colored" });
        setLoading(false)
      }
    }

  }

  return (
    <Container>
      <FlexDiv>

        <div>
          <Header info='Create new User' />
          {loading && <p>Loading...</p>}
        </div>


        <main>
          <form onSubmit={handleSubmit}>

            <label>Name
              <DivError>
                {submitted && !name ? <div><span className='error'>Name cannot be empty </span> <ErrorIcon /> </div> : null}
              </DivError>
              <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>Email
              <DivError>
                {submitted && !email ? <div><span className='error'>Email cannot be empty</span> <ErrorIcon /> </div> :
                  submitted && !email.includes('@') ? <div className='error'>Invalid Email</div> :
                    null}
              </DivError>
              <Input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>


            <label>Password
              <DivError>
                {submitted && !password ? <div> <span className='error'>Password cannot be empty</span>  <ErrorIcon />  </div> : null}
              </DivError>
              <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <label>Role:   <DivError>
              {submitted && !role ? <div> <span className='error'>Role cannot be empty</span>   </div> : null}
            </DivError>
              <select
                onChange={(e) => setRole(e.target.value)}>

                <option>----</option>
                <option value='TESTOWNER'>Test owner</option>
                <option value='CANDIDATE'>Candidates</option>
              </select>

            </label>

            <Button>Create</Button>

            <a href='/adminlogin'>Already Registered, Login in here</a>

          </form>
          <br />
        </main>

      </FlexDiv>
    </Container>
  )
}

export default CreateUser