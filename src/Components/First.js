import React,{useEffect,useState} from 'react'


const First =() =>{
    console.log('inside first')
    useEffect(() => {
      fetch('/api').then(response => {
        if(response.ok){
          return response.json()
        }
      }).then(data => console.log(data))
    },[])
    console.log('inside first2')
  
    
    return (
        <div>
         <h2>Hello</h2>
        </div>
    )
}

export default First
