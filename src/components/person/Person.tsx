import React from "react";
import type * as types from "./types"



const Person = ({name,age,isLoggedIn,hobbies}:types.IProps) => {

 

    
  return (
    <div>
      <h1>
        hi my name is {name.name}{name.family}! and i am {age} years old
      </h1>
      {isLoggedIn ?"ok":"not ok"}

      {hobbies.map(h=>{
          return <h1 key={h}>{h}</h1>
      })}
    </div>
  );
};

export default Person;
