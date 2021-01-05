
import React from 'react'

const register = (username,email,password)=>{
    return fetch('/register',{
        method:'POST',
        body:JSON.stringify({

      username:username,
      email:email,
      password:password


        })
    }).then(response=>response.json())
}


const Login = (email,password)=>{
  return fetch('/login',{
      method:'POST',
      body:JSON.stringify({

    email:email,
    password:password


      })
  }).then(response=>response.json())
}

export default {register,Login};
