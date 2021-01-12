import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/user.service";
import {Bar} from 'react-chartjs-2';




    


function User(){
    const [isState,setState]=useState(false);
    //let state1=0;
    
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    
    const [data,setData] =useState({
        chartData:{
          labels: ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad','surprise'],
          datasets:[
            {
              label:'Emotions',
              data:[],
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(200, 99, 132, 0.6)'
              ]
            }
          ]
        }
      })
    
  

   useEffect(() => {
       console.log(data)
   }, [data])

    const handleSubmit = async() =>{
    
      let response=await UserService.Emotion( start_date, end_date)
      console.log(response.data)
      setData({
        chartData:{
          labels: ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad','surprise'],
          datasets:[
            {
              label:'Emotions',
              data:response.data,
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(200, 99, 132, 0.6)'
              ]
            }
          ]
        }
      })
     setState(true)  
        
    }
    return(
    <div>
        <label>Start date</label>
        <DatePicker selected={start_date} onChange={date => setStartDate(date)} />
        <label>End date</label>
        <DatePicker selected={end_date} onChange={date => setEndDate(date)} />
        <button onClick={handleSubmit}>Submit</button>
       {isState && <Bar
          data={data.chartData}
          width={30}
          height={15}
          options={{
            title:{
              display:true,
              text:'Emotion Analysis ',
              fontSize:25
            }
            // legend:{
            //   display:this.props.displayLegend,
            //   position:this.props.legendPosition
            // }
          }}
        />} 
       

    </div>
    )
}
export default User
