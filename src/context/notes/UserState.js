import React, { useState } from "react";
import userContext from "./UserContext";
import axios from "axios";



const UserState = (props) =>{
    const user = {
        authtoken : "",
        error : "",
        message:"",
    } 
    
    const [state, setstate] = useState(user);

    const updateState = (data) =>{
        setstate(data)
    }

    const createUser = (rest) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post('http://localhost:3001/api/auth/createuser', rest, { headers })
            .then(response => {
                setstate({error : 'OK',  message : "User Successfully Create ! please Login"});
                
            
            }).catch(function (error) {
                if (error.response) {
                    setstate({error :error.response.data })
                }
            });

    } 
    
    
    const loginUser = (rest) =>{
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post('http://localhost:3001/api/auth/login', rest, { headers })
            .then(response => {
                setstate({error : 'OK', data : response.data ,  message : "User Successfully Login !"});
                
            
            }).catch(function (error) {
                if (error.response) {
                    setstate({error :error.response.data })
                }
            });
    }

    return (
        <userContext.Provider value={{state,createUser,loginUser,updateState}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;