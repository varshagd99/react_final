
import Chart from './Chart'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";

// let data={}

const User=()=>{
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [data,setData] =useState({})
    const handleSubmit = () =>{
    
        AuthService.Emotion( start_date, end_date).then(
            (response) => {

                // console.log(response)
                const data = response
                console.log(data)

            }
          );
    }
    return(
    <div>
        <label>Start date</label>
        <DatePicker selected={start_date} onChange={date => setStartDate(date)} />
        <label>End date</label>
        <DatePicker selected={end_date} onChange={date => setEndDate(date)} />
        <button onClick={handleSubmit}>Submit</button>
        <Chart data={data}/>
       

    </div>
    )
}
export default User