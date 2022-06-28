import { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

function DataProvider(props){

    const [style, setStyle] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleButtonSubmit = useRef(null);
    const [msg, setMsg] = useState("")
    let navigate = useNavigate();
   
    const value = { style, setStyle, msg, setMsg, navigate, loading, setLoading, handleButtonSubmit};
      return(
          <DataContext.Provider value={value}>
              {props.children}
          </DataContext.Provider>
      ) 
  }
  export default DataProvider;