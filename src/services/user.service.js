import authHeader from "./auth-header";
import AuthService from "../services/auth.service";


const getUserBoard = () => {
  return fetch.get('/user', { headers: authHeader() });
};

const getAdminBoard = () => {
    return fetch.get('/admin', { headers: authHeader() });
  };

 
  const Emotion = async(id,start_date,end_date)=>{
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser);
        const response=await fetch('/emotionGraph',{
        method:'POST',
        headers:authHeader(),
        body:JSON.stringify({
          id:id,
          start_date:start_date,
          end_date:end_date,
        
  
  
        })

    })
    return response.json()
  }

  const user_id = async(user_name)=>{
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    const response=await fetch('/name',{
    method:'POST',
    headers:authHeader(),
    body:JSON.stringify({
      user_name:user_name
    


    })

})
return response.json()
} 
  export default {
  
    getUserBoard,
 
    getAdminBoard,
    Emotion,
    user_id
  }