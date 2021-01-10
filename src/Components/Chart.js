import React, {Component,useState }from 'react';

import {Bar, Line, Pie} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import {Jumbotron,button} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";



// class Chart extends Component{
function Chart(chartData,displayTitle,displayLegend,legendPosition){
  // constructor(props){
    // super(props);
    let [data,setData] =useState({})
    console.log("Inside Chart")

        chartData={
          labels: ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad','surprise'],
          datasets:[
            {
              label:'Emotions',
              data:[
                //{data}
                6,
                1,
                15,
                7,
                3,
                8,
                75
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
      
     console.log(data)
  // render(){
    
    return (
      <div>
        <div className="chart">
        <Bar
          // data={this.state.chartData}
          data={chartData.data}
          width={30}
          height={15}
          options={{
            title:{
              display:displayTitle,
              text:'Emotion Analysis',
              fontSize:25
            },
            legend:{
              display:displayLegend,
              position:legendPosition
            }
          }}
        />

      </div>
      </div>
    )
  // });
        }
      

export default Chart;