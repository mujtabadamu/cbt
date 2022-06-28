import { useState, useEffect } from "react"
import axios from "axios"


const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("")

  useEffect(()=>{  
      axios.get(url)
      .then((response)=>{
          console.log(response.data)
          setData(response.data);
          setMsg(null);
          setLoading(false);
      })
      .catch((error)=>{
          console.log(error.message);
          setMsg(error.message);
          setLoading(false);
          setData(null)
      })

  },[])

  return {data, loading, msg}

}

export default useFetch;