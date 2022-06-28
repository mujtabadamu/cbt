import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function GetOneExam() {

  const [examnumber, setExamnumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("")
  const [pass_mark, setPass_mark] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [start, setStart] = useState("");
  const [duration, setDuration] = useState("");
  const [timed, setTimed] = useState(true)
  const username = localStorage.getItem('email');
    const password = localStorage.getItem('password');


  function convertDatetoStr(info) {
    var date = info;
    var val1 = Date.parse(date);
    var val2 = new Date(val1);
    var str = val2.toLocaleString('en-US');
    return str;
  }

  function handleFind(e) {
    e.preventDefault()
    console.log(examnumber);

    setLoading(true);

    axios.get(`https://morning-gorge-09623.herokuapp.com/api/v1/exam/${examnumber}`, {
      crossDomain: true,
      // withCredentials: true,
      headers: {
        'accept': 'application/json',
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      auth: {
        username: JSON.parse(username),
        password: JSON.parse(password)
      }
    })
      .then(res => {
        setLoading(false);
        console.log("----RESPONSE----", res);
        console.log("----RESPONSE--DATA--", res.data);
        if (res.status === 200) {
          toast.success(`${examnumber} Successfully FOUND`)
          setMsg("")
          setData(res.data);
          setId(res.data.id)
          setName(res.data.name);
          setDescription(res.data.description)
          setPass_mark(res.data.pass_mark)
          setInstructions(res.data.instructions)
          setDuration(res.data.duration)
          setStart(res.data.start)
        }
        
      })
      .catch((error) => {
        setLoading(false)
        setMsg(error.message)
        toast.error(error.message, { theme: "colored" });
        toast.error(error.response.data.error_message, { theme: "colored" });
        console.error(error)
        console.log(error.message);
      });

  }



  return (
    <div className='container'>

      <div className='get_single_exam'>
        <h3>Get Single Exam by Unique ID</h3>

       
        <form onSubmit={handleFind}>
          <label>Exam Number:
            <input type='text'
              placeholder='Exam Number'
              value={examnumber}
              required
              onChange={(e) => setExamnumber(e.target.value.toUpperCase())}
            /></label>
          <button>Find</button>
        </form>

        {loading && loading ?
          <div>Loading...</div> :





          <div className='single_exam_info'>

            <label>Name: <input type='text' value={name}
              onChange={(e) => { setName(e.target.value) }} /></label>

            <label>Description: <textarea value={description}
              onChange={(e) => { setDescription(e.target.value) }} /></label>

            <label>Pass_mark: <input type='text' value={pass_mark}
              onChange={(e) => { setPass_mark(e.target.value) }} /></label>

            <label>Instruction: <textarea value={instructions}
              onChange={(e) => { setInstructions(e.target.value) }} /></label>


            <label>Duration: <input type='text' value={duration}
              onChange={(e) => { setDuration(e.target.value) }} /></label>

            <label>Date: <input type='date' value={start && new Date(start).toISOString().slice(0, 10)}
              onChange={(e) => { setStart(e.target.value) }} /></label>


            <label>Timed: <input type='text' value={timed ? "YES TIME" : "NOT TIME"}
              onChange={(e) => { setTimed(e.target.value) }} /></label>

          </div>

        }

      </div>

    </div>
  )
}

export default GetOneExam