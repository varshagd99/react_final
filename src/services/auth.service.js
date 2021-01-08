

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




const login = (email,password)=>{
  return fetch('/login',{
      method:'POST',
      body:JSON.stringify({

    email:email,
    password:password


      })
  }).then((response) =>  response.json())
}

const logout = () => {
  localStorage.removeItem("user");
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {register,login,logout,getCurrentUser};

