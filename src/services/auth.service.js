

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


const Emotion = (start_date,end_date,chartData)=>{
  return fetch('/emotionGraph',{
      method:'POST',
      body:JSON.stringify({

        start_date:start_date,
        end_date:end_date,
        chartData


      })
     
  }).then(response=>response.json())
  
}
// console.log(Emotion)
export default {register,login,logout,getCurrentUser,Emotion}


