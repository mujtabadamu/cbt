import axios from 'axios';
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import useFetch from '../CustomHooks/useFetch'
import { Container } from '../Styled';

function GetAllUser() {

    const url = "https://heroku-cbt.herokuapp.com/api/v1/auth/";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("")
  
    useEffect(()=>{  
        axios.get(url)
        .then((response)=>{
            if(response.status === 200){
                toast.success('Fetch Record Successfully', { theme: "colored" }); //only if no internet connection
                setData(response.data);
                setMsg(null);
                setLoading(false);
            }
        })
        .catch((error)=>{
            console.log(error.message);
            setMsg(error.message);
            toast.error(error.message, { theme: "colored" }); //only if no internet connection
            setLoading(false);      
            setData(null)
        })
  
    },[])
    

  return (
    <div>
        <p>All Users    {  loading && <span>Loading...</span>}</p>
  
   
        <table border='1px'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
               
            </tr>
        </thead>
        <tbody>
        
        {data && data.map((user)=>{
           return<tr key={user.id}>
           <td>{user.name.toUpperCase()}</td>
           <td>{user.email}</td>
           <td>{user.role}</td>
           
           </tr>
       })}


       </tbody>
       </table>
       
       <a href='/adminlogin' >Login As Admin</a>

     
    </div>
  )
}

export default GetAllUser