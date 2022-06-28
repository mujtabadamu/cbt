import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import {  Exam, Scheduled } from '../Styled';


function GetAllTest() {
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const username = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    useEffect(() => {
        setLoading(true);

        axios.get('https://heroku-cbt.herokuapp.com/api/v1/exam', {
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
        }).then((response) => {
            setData(response.data);
            setLoading(false);
            setMsg("")
            // console.log("Response DATA:::", response.data)

        }).catch((error) => {
            setLoading(false)
            // setMsg(error.message);
            toast.error(error.message, { theme: "colored" });
            console.error(error)
        })
    }, [])



    return (<div>

        <Scheduled>

            <div className='scheduledHead'>
                <p>Scheduled  {loading && <span>Loading...</span>}</p>
            </div>


            <div className='scheduledBody'>

                {
                    data && data.map((item) => {
                        return <div className='exams' key={item.id}>
                            <Exam>
                                <Link to={`/exam/${item.exam_number}`}>
                                    <p>{item.exam_number} <FaPen /></p>
                                    <p>Approved: {item.candidates.length}</p>
                                    <p>Pending: {item.registered_candidates.length}</p>
                                    <p>Total Registered: {item.registered_candidates.length + item.candidates.length}</p>

                                </Link>
                            </Exam>

                           
                        </div>

                    })
                
                }


            </div>
        </Scheduled>


    </div>
    )
}

export default GetAllTest