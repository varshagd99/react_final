
import Chart from './Chart'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {Jumbotron,button} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";

// let data={}

function User(){
    const [isState,setState]=useState(false);
    //let state1=0;
    
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
  //  let [data,setData] =useState({})
   let data={}
    const handleSubmit = () =>{
    
        AuthService.Emotion( start_date, end_date,data).then(
            (response) => {
                console.log("Inside the handle submit")
                data=response
                console.log(data);
                setState(true);

            }
          );
        }
        return(
            <div>
                <Jumbotron>
                <label>Start date</label>
                <DatePicker selected={start_date} onChange={date => setStartDate(date)} />
                <label>End date</label>
                <DatePicker selected={end_date} onChange={date => setEndDate(date)} />
                <button onClick={handleSubmit}>Submit</button>
                {(isState) && <Chart data1={data}/>}
                </Jumbotron>
               
        
            </div>
            )
    }


export default User
