import { createContext, useState } from "react";


export const AuthContext = createContext();


function AuthProvider(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(undefined);
   
    const values = { isLoggedIn, setIsLoggedIn }

    return <AuthContext.Provider value={values}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthProvider;