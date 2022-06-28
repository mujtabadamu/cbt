import { useContext, useState } from 'react';
import QuestionList from './QuestionList';
import { DataContext } from '../../Context/DataContext';
import { v4 as uuid } from 'uuid';
import { Button, Container,  InputForm, InputQue, TextForm } from '../Styled';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';


function FormQuestion() {
  const { loading,setLoading, navigate,  msg,  } = useContext(DataContext);
  const Unique_id = uuid();
  const small = Unique_id.slice(0, 8);
  const location = useLocation();
  const url = `https://heroku-cbt.herokuapp.com/api/v1/exam/${location.state}/add-questions`;
  const username = localStorage.getItem('email');
  const password = localStorage.getItem('password');
   
  //   Questions Variables.......
  const [point, setPoint] = useState("");
  const [text, setText] = useState(); //quetion var txt 
  const [answer, setAnswer] = useState(); //radio button tragger and set the answer
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");

  const [questions, setQuestions] = useState([]); //Array of question

  function AddQuestion(e) {
    e.preventDefault();
    const options = [optA, optB, optC, optD]; // option ie answers 
    const id = Math.random();
    const datas = { text, point, options, answer, id }; // object to store descriptions & array of options 
    const listOfQuestions = [datas]; //Array that store question,answer,options,point
    
    setQuestions([...questions, {
      id: questions.length + 1,
      text: datas.text,
      answer: datas.answer,
      point: datas.point,
      options: datas.options
    }])

    questions.push(listOfQuestions);

    //  console.log(listOfQuestions)
    //  console.log(questions.length);
    // try ans set all the question to new state and pass the state to parent form
    // console.log(questions)

    //   Question Variables....
    e.preventDefault();
    setText('');
    setPoint('');
    setAnswer(false);
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
  }

  function SubmitQuestion(e){
    e.preventDefault();
    const data = questions;
    // console.log(data)
    const jsonData = JSON.stringify(data);

    axios.post(url, jsonData,
    {
      headers: {
        'accept': 'application/json',
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      auth:{
        username: JSON.parse(username),
        password: JSON.parse(password)
      }
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success("Questions Added Successfully...");
        setLoading(true);
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

    
  }


  return (
    <Container>
    
      {loading && <p>Loading...</p>}
      {msg && <p>{msg}</p>}

      <div>
        <h2>Exam Number: {location.state}</h2>
        <h3>Q{questions.length === 0 ? '' : `${questions.length}`}</h3>
        <form onSubmit={AddQuestion}>
          <div>
      
            <label>Question <TextForm name='question' value={text} onChange={(e) => setText(e.target.value)} /> </label><br />
            <label>Points <InputForm type='number' name='point' value={point} onChange={(e) => setPoint(e.target.value)} /> </label> <br />

            <h3>Options</h3>

            <div>
              <label><InputQue placeholder='A' type='text' name='A' value={optA} onChange={(e) => setOptA(e.target.value)} />
                <input
                  type='radio'
                  name='answer'
                  value={optA}
                  onChange={(e) => setAnswer(e.target.value)}
                  checked={answer === optA}

                />
              </label>
            </div>

            <div>
              <label><InputQue placeholder='B' type='text' name='B' value={optB} onChange={(e) => setOptB(e.target.value)} />
                <input
                  type='radio'
                  name='answer'
                  value={optB}
                  onChange={(e) => setAnswer(e.target.value)}
                  checked={answer === optB}

                />
              </label>
            </div>

            <div>
              <label><InputQue placeholder='C' type='text' name='C' value={optC} onChange={(e) => setOptC(e.target.value)} />
                <input
                  type='radio'
                  name='answer'
                  value={optC}
                  onChange={(e) => setAnswer(e.target.value)}
                  checked={answer === optC}
                />
              </label>  
            </div>

            <div>
              <label><InputQue placeholder='D' type='text' name='D' value={optD} onChange={(e) => setOptD(e.target.value)} />
                <input
                  type='radio'
                  name='answer'
                  value={optD}
                  onChange={(e) => setAnswer(e.target.value)}
                  checked={answer === optD}
                /> </label>
            </div>

            <Button type='submit'>Add</Button>
          </div>
          </form>

    <div>
      <form onSubmit={SubmitQuestion}>
      <button>Submit</button>
      </form>
    </div>

      </div>


      <div className='question_list'>
        <QuestionList questions={questions} setQuestions={setQuestions} />
      </div>

    </Container>


  );
}

export default FormQuestion;
