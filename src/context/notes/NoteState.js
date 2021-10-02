import React, { useState } from "react";
import noteContext from "./NoteContext";


const noteState = () =>{
    const a ={
        name : "Ashish",
        class : "B",
    } 
    const [state, setstate] = useState(a)

    const update = () =>{
        setTimeout(
            ()=>{
                setstate({
                    name :"mayank",
                    class : "C"
                })
            },1000);
        
    }

    return (
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default noteState;