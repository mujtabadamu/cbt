import axios from 'axios';
import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from '../../Context/DataContext';
import { toast } from 'react-toastify';
import { Button, Container, InputForm, TextForm } from '../Styled';


function CreateExam() {

  const { setLoading, setMsg, navigate, handleButtonSubmit } = useContext(DataContext);
  const username = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const url = 'https://heroku-cbt.herokuapp.com/api/v1/exam'; // posting data into new api

  // Test variables ...
  const [exam_number, setExam_number] = useState("");
  const [name, setName] = useState("");
  const [pass_mark, setPass_mark] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [start, setStart] = useState("");
  const [dataTime, setDataTime] = useState("");
  const [duration, setDuration] = useState("");
  const [timed, setTimed] = useState(true);
  const [created, setCreated] = useState(new Date().toISOString());
  const [open, setOpen] = useState(true);
  const date = new Date().toISOString().substring(0, 10);
  // const [clo] = useState()




  // Run(dataTime)
  //handle submit functions
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      exam_number, name, pass_mark, description, instructions, start, duration: dataTime,
      timed, open,
    };
    console.log(data)

    const jsonData = JSON.stringify(data); //convert the data into json format   
    axios.post(url, jsonData, {
      crossDomain: true,
      // withCredentials: true,
      headers: {
        'accept': 'application/json',
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      auth: {
        username: JSON.parse(username),
        password: JSON.parse(password)

      }
    })
      .then((response) => {
        setLoading(false);
        // alert(`New Exam Added Successfully`);
        toast.success('New Exam Added Successfully');
        navigate('/dashboard/getalltest');
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false)
          console.error("ERROR>>>>", error)
          console.log("ERROR>>>>Message", error.message);
          // setMsg(error.response.data.error_message)
          toast.error(error.response.data.error_message);

        } else {
          console.log(`ERROR>>>>eLSE: ${error.message}`)
          console.log('No internet............')
        }

      })

    setExam_number("");
    setDescription("");
    setName("");
    setPass_mark("");
    setStart("");
    setDuration("");
    setInstructions("");
    setTimed("");

  }
  return (
    <Container>

      <div className=''>
        <h4><Link to='/dashboard'>Dashboard</Link> &gt; New Exam </h4>
      </div>

      <div className=''>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Exam Number
              <InputForm
                type='text'
                name='test_number'
                onChange={(e) => { setExam_number(e.target.value) }}
                value={exam_number.toUpperCase()}
              />
            </label>
          </div>
          <div>
            <label>
              Exam Name<InputForm
                type='text'
                name='name'
                onChange={(e) => { setName(e.target.value) }}
                value={name}
              />
            </label>
          </div>
          <div>
            <label>Pass Mark: <InputForm
              type='number'
              name='pass_mark'
              onChange={(e) => { setPass_mark(e.target.value) }}
              value={pass_mark}
            /> </label>
          </div>

          <div><label>Description <TextForm
            name='describtion'
            onChange={(e) => { setDescription(e.target.value) }}
            value={description}
          />
          </label>
          </div>

          <div><label>Instruction
            <TextForm name='instruction' required onChange={(e) => { setInstructions(e.target.value) }} value={instructions}
            />
          </label>
          </div>

          <div>
            <label htmlFor='openTrue' style={{ background: open ? '#173979' : '' }} className='open'>Open Test
              <InputForm type='radio' name='open' value={open} style={{ display: 'none' }} id='openTrue' onChange={(e) => setOpen(true)} />
            </label>
          </div>

          <div>
            <label htmlFor='openFalse' style={{ background: open ? '' : '#173979' }} className='open'>Close Test
              <InputForm type='radio' name='open' value={open} style={{ display: 'none' }} id='openFalse' onChange={(e) => setOpen(false)} />
            </label>
          </div>

          <div>
            <label>
              Start: <InputForm
                type='datetime-local'
                name='start'
                onChange={(e) => { setStart(e.target.value) }}
                value={start}
              />
            </label>
          </div>



          <div>
            <label htmlFor='timeTrue' style={{ background: timed ? 'grey' : 'none' }} className='time'>Timed</label>
            <InputForm type='checkbox' value={timed} id='timeTrue' style={{ display: 'none' }} onChange={(e) => { setTimed(true) }} />
          </div>

          <div>
            <label htmlFor='timeFalse' style={{ background: !timed ? 'grey' : 'none' }} className='not_time'>Not Timed</label>
            <input type='checkbox' value={timed} id='timeFalse' style={{ display: 'none' }} onChange={(e) => { setTimed(0) }} />
          </div>


          <p style={{ display: timed ? 'block' : 'none', marginTop: '15px' }}>

            <label>Exam Duration: min(05:00) max(23:00)
              <InputForm
                type="time"
                name='duration'
                min="05:00"
                max="23:00"
                formNoValidate
                onChange={(e) => {
                  const time = e.target.value;
                  var sp = time.split(':');
                  var min = sp[0];
                  var sec = sp[1];
                  var data = Number(min) * 60 + Number(sec);
                  setDataTime(data);
                  timed ? setDuration(time) : setDuration("");
                }}
                value={duration}

              />
            </label>
          </p>
              <Button>Submit</Button>
          {/* error when time is false FIX ME ******/}
        </form>

      </div>


    </Container>
  )
}

export default CreateExam