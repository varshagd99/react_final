import React, {Component,useState }from 'react';

import {Bar, Line, Pie} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import {Jumbotron,button} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";

class Chart extends Component{
 
 
  constructor(props){
    super(props);
    this.state ={
        chartData:props.chartData
    }

    
    //console.log(props.chartData.datasets)
    
}


  render(){
    return (
      <div>
        <div className="chart">

        <Bar
          data={this.state.chartData}
          width={30}
          height={15}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Emotion Analysis ',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

      </div>

      </div>

      
    )
  }
}

export default Chart;