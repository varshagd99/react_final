
import Chart from './Chart'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {Jumbotron,button} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/user.service";




    


function User(){
    const [isState,setState]=useState(false);
    //let state1=0;
    
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    let [Data1, setData1] = useState({});
  //  let [data,setData] =useState({})

   let chartData={}


    const handleSubmit = () =>{
    
        UserService.Emotion( start_date, end_date).then(
            (response) => {
                console.log("Inside the handle submit")
                
                console.log(response.angry);
                Data1=response
                console.log(Data1.angry);
                setState(true);

            }
          );
        }
    
        chartData={
            labels: ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad','surprise'],
            datasets:[
                {
                label:'Emotions',
                data:[
                    //{response}
                    Data1.angry
                ],
                backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(200, 99, 132, 0.6)'
                ],
                },
        
            ]
        
            }

   
        return(
            <div>
                {}
                <Jumbotron>
                <label>Start date</label>
                <DatePicker selected={start_date} onChange={date => setStartDate(date)} />
                <label>End date</label>
                <DatePicker selected={end_date} onChange={date => setEndDate(date)} />
                <button onClick={handleSubmit}>Submit</button>
                {(isState) && <Chart chartData={chartData}/>}
                </Jumbotron>
               
        
            </div>
            )
    }


export default User
