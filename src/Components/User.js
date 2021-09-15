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
import { First } from "react-bootstrap/esm/PageItem";
import userService from "../services/user.service";
import authHeader from "../services/auth-header";


let nameSelected
function User(){
    const currentUser = AuthService.getCurrentUser();
    const [isState,setState]=useState(false);
    //let state1=0;
    const [user_name,setName]=useState("");
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [render, setRender] = useState(false);
    const [Emotions, setEmotions] = useState(false);
    const [Dropdown,setDropdown] = useState(false)
    const [options,setOptions]=useState([])
    const [Camera,setCamera] = useState(false)
    const [Admin,setAdmin] = useState(false);
    console.log(currentUser);
    const [dropdownvalue,setDropdownvalue] =useState('')
    //  let response=First.First()
    //  console.log(response.data)

   

    
    
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
      setEmotions(true)
      setDropdown(true)
      fetch('/api').then(response => {
        if(response.ok){
          return response.json()
        }
      }).then(datas => {
        const data=datas.name
        const op=data.map(d=>({
          "value":d,
      "label":d}))
        setOptions(op)
        console.log(datas)
      })
     }
   console.log(options)

    const HandleCamera = () =>{
      setCamera(true)
      setEmotions(false)
      setState(false)
    }

    const Emotion = () =>{
      console.log('hello')
      setState(true)
      setEmotions(true)
      setDropdown(false)
    }

    const handleDropdown =(e) =>{
      nameSelected=e.value
      console.log(nameSelected)
     
    }

    const handleSubmit = async() =>{
      console.log(nameSelected)
      let user_id = await userService.user_id(nameSelected)
      console.log(user_id.name)
      let id =user_id.name
      let response=await UserService.Emotion(id, start_date, end_date)
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
  
      {/* <Profile/> */}
        {/* <First/> */}
        <Jumbotron>
        <div>
          <div>
          <ul class="nav nav-tabs">
           
          <li class="active" className="nav-item-user"><a href="#"className="link" onClick={Emotion}>Your Emotion</a></li>
          {currentUser.user_type == 'A' && <li className="nav-item-user"><a href="#" className="link" onClick={handle}>Employee Emotion</a></li>}
          
          <li className="nav-item-user"><a href="#" className="link" onClick={HandleCamera}>Procter</a></li>
          {Camera && <img src="{{ url_for('video_feed') }}"></img>}
        </ul>
        </div>

      {Emotions && <div class="container">
      <div class="row">
      {Dropdown && <div class="col-sm">
          
          <Select placeholder="Select Name" options={options} className="dropdown" onChange={handleDropdown}  />
         
          </div> 
          
         }
        
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
              text:'Emotion Analysis',
              fontSize:25
            },
            // legend:{
            //   display:this.props.displayLegend,
            //   position:this.props.legendPosition
            // }
          }}
        />}
        <h2> {nameSelected}</h2>
       
         </Jumbotron>



    </div>
    )
}
export default User
