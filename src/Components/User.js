import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import './user.css'
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/user.service";
import {Bar} from 'react-chartjs-2';
import { Jumbotron } from "react-bootstrap";
import AuthService from "../services/auth.service";
import Select from 'react-select';
import First from './First'
import Profile from "./Profile";



function User(){
    const currentUser = AuthService.getCurrentUser();
    const [isState,setState]=useState(false);
    //let state1=0;
    const [name,setName]=useState({});
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [render, setRender] = useState(false);
    const [Emotions, setEmotions] = useState(false);
    const [Dropdown,setDropdown] = useState(false)
    console.log(currentUser);
    //  let response=First.First()
    //  console.log(response.data)

    useEffect(() => {
      console.log('user data')
      fetch('/api').then(response => {
        if(response.ok){
          return response.json()
        }
      }).then(data => console.log(data))
    },[])
    console.log("inside user")

    const options = [
      { value: 'chocolate', label: 'Chocolate' }
    ]
    
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


    const handle = () =>{
      setRender(true)
      setDropdown(true)
      
    }

    const Emotion = () =>{
      console.log('hello')
      setEmotions(true)
      setDropdown(false)
    }

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
      <First/>
      {/* <Profile/> */}
      <authService/>
         <Jumbotron>
        <div>
          <div>
          <ul class="nav nav-tabs">
           
          <li class="active" className="nav-item-user"><a href="#"className="link" onClick={Emotion}>Your Emotion</a></li>
          {currentUser.user_type == 'A' && <li className="nav-item-user"><a href="#" className="link" onClick={handle}>Employee Emotion</a></li>}
          
          <li className="nav-item-user"><a href="#" className="link" >Procter</a></li>
        </ul>
        </div>

      {Emotions && <div class="container">
      <div class="row">
      {Dropdown && <div class="col-sm">
          
          <Select placeholder="Select Name" options={options} className="dropdown"/>
          </div>}
        
        <div class="col-sm">
        <label><font size="3">Start date</font></label>
          <DatePicker selected={start_date} onChange={date => setStartDate(date)} width="276" id="startDate" className="date"/>
        </div>
        <div class="col-sm">
        <label><font size="3">End date</font></label>
          <DatePicker selected={end_date} onChange={date => setEndDate(date)} width="276" id="endDate" className="date"/>
          
            
        </div>
        
      </div>
      
      <button onClick={handleSubmit} className="button"><b>SUBMIT</b></button>
    </div>}      



        
        
       
       
       
       </div>
       {isState && <Bar
          data={data.chartData}
          width={30}
          height={15}
          options={{
            title:{
              display:true,
              text:'Emotion Analysis ',
              fontSize:25
            },
            // legend:{
            //   display:this.props.displayLegend,
            //   position:this.props.legendPosition
            // }
          }}
        />} 
         </Jumbotron>



    </div>
    )
}
export default User
