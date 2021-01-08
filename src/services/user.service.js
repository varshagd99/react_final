import authHeader from "./auth-header";


const getUserBoard = () => {
  return fetch.get('/user', { headers: authHeader() });
};

const getAdminBoard = () => {
    return fetch.get('/admin', { headers: authHeader() });
  };

  export default {
  
    getUserBoard,
 
    getAdminBoard
  }