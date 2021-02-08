import React,{useEffect,useState} from 'react'


 const First=() =>{
    console.log('inside first')

    useEffect(()=>{
        fetch('/api').then(data=>console.log(data.name))
    },[])
    
    return (
        <div>
         <h2>hello world </h2>  
        </div>
    )
}

export default First
