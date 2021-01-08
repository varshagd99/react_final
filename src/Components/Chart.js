import React, {Component,useState }from 'react';

import {Bar, Line, Pie} from 'react-chartjs-2';




class Chart extends Component{

  constructor(props){
    super(props);

    // const [data,setData] =useState({})
    console.log(props.data)
    this.state ={
        chartData:{
          labels: ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad','surprise'],
          datasets:[
            {
              label:'Emotions',
              data:[
                6,
                1,
                15,
                7,
                3,
                8,
                1
              ],
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
      }
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