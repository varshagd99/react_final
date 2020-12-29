import React,{useEffect} from 'react'


 const First=() =>{

    useEffect(()=>{
        fetch('/api').then(data=>console.log(data.json()))
    },[])
    
    return (
        <div>
         <h2>hello world </h2>  
        </div>
    )
}

export default First
