import React from 'react';
import './Home.css'
import {Jumbotron,button} from 'react-bootstrap'



const Home=()=>{
    return (
    <div className="container">
        <Jumbotron className="Jumbo">
        <h1>Facial Emotional Analysis</h1>
        <div className="face">
            Hello
        </div>

        </Jumbotron>
       
    </div>);
}
export default Home