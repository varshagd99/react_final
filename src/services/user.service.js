import authHeader from "./auth-header";


const getUserBoard = () => {
  return fetch.get('/user', { headers: authHeader() });
};

const getAdminBoard = () => {
    return fetch.get('/admin', { headers: authHeader() });
  };

 
  const Emotion = (start_date,end_date)=>{
    return fetch('/emotionGraph',{
        method:'POST',
        headers:authHeader(),
        body:JSON.stringify({
          start_date:start_date,
          end_date:end_date,
        
  
  
        })
       
    }).then(response=>response.json())
    
  }
  export default {
  
    getUserBoard,
 
    getAdminBoard,
    Emotion
  }