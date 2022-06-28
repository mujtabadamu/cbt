import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaPen, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Header from '../Header';
import { Container, ExamDetails } from '../Styled';
const url = 'https://heroku-cbt.herokuapp.com/api/v1/exam';


function ExamInfo() {

  const { exam_number } = useParams()
  const navigate = useNavigate();
  // const {style, setStyle, navigate, txtField} = useContext(DataContext);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);


  const username = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  const [candidates, setCandidates] = useState([]);
  const [registered_candidates, setRegistered_candidates] = useState([])
  const [name, setName] = useState()
  const [question, setQuestion] = useState([]);
  const [description, setDescription] = useState();

  useEffect(() => {
    setLoading(true);

    axios.get(`${url}/${exam_number}`, {
      crossDomain: true,
      // withCredentials: true,
      headers: {
        'accept': 'application/json',
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      auth: {
        username: JSON.parse(username),
        password: JSON.parse(password)
      }
    }).then((response) => {
      // setData(response.data);
      setLoading(false);
      setMsg("")
      console.log("Response DATA:::", response.data);
      setCandidates(response.data.candidates);
      setRegistered_candidates(response.data.registered_candidates);
      setName(response.data.name)
      setQuestion(response.data.questions)
      setDescription(response.data.description)
      console.log("Candidates:", response.data.candidates);
      console.log("REG:", response.data.registered_candidates);
    }).catch((error) => {
      setLoading(false)
      // setMsg(error.message);
      toast.error(error.message, { theme: "colored" });
      console.error(error)
    })
  }, [])


  function handleAccept({ email, name }) {
    const jsonData = new Array(email);
    axios.patch(`${url}/${exam_number}/candidates/approve`, jsonData, {
      crossDomain: true,
      // withCredentials: true,
      headers: {
        'accept': 'application/json',
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'PATCH',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      auth: {
        username: JSON.parse(username),
        password: JSON.parse(password)
      }
    }).then(response => {
      console.log(response)
      setCandidates([...response.data.candidates])
      toast.success(`${name} Added Successfully`)
    })
      .catch(error => {
        console.log(error)
        // toast.error(`${error}`)
        toast.error(`${error.message}`)
        console.log(error.message)
      })
  }

  function handleDelete() {

    setLoading(true)
    // console.warn("Exam-Id or Number>>>", exam_number)
    axios.delete(`https://heroku-cbt.herokuapp.com/api/v1/exam/${exam_number}`, {
      crossDomain: true,
      // withCredentials: true,
      headers: {
        'accept': 'application/json',
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      auth: {
        username: JSON.parse(username),
        password: JSON.parse(password)
      }
    }).then(res => {
      console.log(res);
      toast.success(`${exam_number} Deleted Successfully`, { theme: "colored" });
      // setTimeout(window.location.reload(true), 2000)
      setLoading(false);
      navigate('/dashboard');
      console.log(res);
    }).catch((error) => {
      setLoading(false);
      toast.error(error.response.data.error_message, { theme: "colored" }); //only if no internet connection 
      toast.error(error.response.data.error, { theme: "colored" }); //only if no internet connection 
      console.error(error)
      console.log(error.message);
    });
  }

  return (
    <Container>

      <Header info='Exam Record' />

      <ExamDetails>
        <p> <FaArrowLeft /> <Link to='/dashboard/getalltest'>Go Back</Link>   </p>

        <header>
          <div className='exam-info'>
            <h3>{exam_number}</h3>
            <h4>{name}</h4>
            <p>{question.length} Questions</p>
          </div>

          <div>
            <button className='add' onClick={() => {
              navigate('/addquestions', { state: exam_number })
            }}><FaPlusSquare />  <br />Add Que</button>

            <button className='edit' onClick={() => {
              navigate('/update-exam', { state: exam_number })
            }}><FaPen /><br />Edit</button>
            <button className='delete' onClick={() => { handleDelete() }}><FaTrashAlt /> <br />Delete Exam</button>
          </div>

        </header>

        <main>
          <p>exam information</p>
          <p>{description}</p>
        </main>


        <div className='accept_table'>
          <h3>New Registered Candidates {exam_number}</h3>

          <table border='1px'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Accept</th>
              </tr>

            </thead>
            <tbody>
              {registered_candidates.map((std) => {
                return <tr key={std.id}>
                  <td>{std.name}</td>
                  <td>{std.email}</td>
                  <td><button onClick={() => { handleAccept(std) }}>Accept</button></td>
                </tr>
              })}
            </tbody>

          </table>
        </div>

        <div className='accept_table'>
          <h3>Approved Candidates</h3>
          <table border='1px'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>

            </thead>
            <tbody>

              {candidates.map((std) => {
                return <React.Fragment key={std.id}>
                  <tr>
                    <td>{std.id}</td>
                    <td>{std.name}</td>
                    <td>{std.email}</td>
                  </tr>

                </React.Fragment>
              })}

            </tbody>

          </table>

        </div>

      </ExamDetails>


    </Container>
  )
}

export default ExamInfo