import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

function UpdateExam() {
    const location = useLocation();
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const exam_number = location.state;
    const username = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const [data, setData] = useState([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pass_mark, setPass_mark] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [start, setStart] = useState("");
    const [duration, setDuration] = useState("");
    const [timed, setTimed] = useState();
    const [questions, setQuestions] = useState([]);
    const [open, setOpen] = useState();


    useEffect(() => {
        setLoading(true);
        axios.get(`https://heroku-cbt.herokuapp.com/api/v1/exam/${exam_number}`, {
            crossDomain: true,
            // withCredentials: true,
            headers: {
                'accept': 'application/json',
                "Content-type": "application/json;charset=UTF-8",
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            auth: {
                username: JSON.parse(username),
                password: JSON.parse(password)
            }
        }).then((response) => {
            setLoading(false);
            setData(response.data);
            console.log(response)
            setMsg("")
            setId(response.data.id)
            setName(response.data.name)
            setDescription(response.data.description)
            setPass_mark(response.data.pass_mark)
            setInstructions(response.data.instructions)
            setDuration(response.data.duration)
            setStart(response.data.start);
            setTimed(response.data.timed);
            setOpen(response.data.open);

        }).catch((error) => {
            setLoading(false)
            // setMsg(error.message);
            // toast.error(error.message, { theme: "colored" });
            console.error(error)
        })
    }, [])


    function handleUpdate(id) {
        //  console.log(data)

        const info = {
            exam_number,
            name,
            pass_mark,
            description,
            instructions,
            start,
            duration,
            timed,
            open
        }
        console.log("INFO", info)
        const jsonData = JSON.stringify(info)

        axios.put(`https://heroku-cbt.herokuapp.com/api/v1/exam/update/${exam_number}`, jsonData, {
            crossDomain: true,
            // withCredentials: true,
            headers: {
                'accept': 'application/json',
                "Content-type": "application/json;charset=UTF-8",
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'PUT'
            },
            auth: {
                username: username,
                password: password
            }
        })
            .then(res => {
                // console.log(res);
                toast.success(`${exam_number} Updated Successfully`, { theme: "colored" });
                setLoading(false);
                console.log(res);
            })
            .catch((error) => {
                setLoading(false)
                setMsg(error.response.data.error);
                setMsg(error.response.data.error_message);
                console.error("-------ERROR-------", error)
                console.log("------ERROR--MSG--", error.message);
            });

    }



    return (
        <div>
            <h3>Update Exam: {loading ? 'Loading...' : exam_number}</h3>

            <div className='updateForm'>
                <h2>Exam Name - {exam_number}, {questions && questions.length} Questions</h2>

                <label>Id: <input type='text' readOnly value={id} onChange={(e) => setId(e.target.value)} /></label>

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


                <label>Timed: <input type='text' value={timed ? "true" : "false"}
                    onChange={(e) => { setTimed(e.target.value) }} /></label>

                <label>Open: <input type='text' value={timed ? "true" : "false"}
                    onChange={(e) => { setOpen(e.target.value) }} /></label>

                <button onClick={handleUpdate}>Update</button>

            </div>

        </div>
    )
}

export default UpdateExam