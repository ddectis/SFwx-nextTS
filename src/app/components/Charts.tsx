import React from "react";
import Chart, { CategoryScale, LinearScale, TimeScale, PointElement, LineElement, BarElement } from "chart.js/auto";
import BubbleElement from "chart.js/auto";
Chart.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, BarElement);
import { Line, Bubble, Bar } from "react-chartjs-2";
import { WeatherChartData } from "../types/types";

interface ChartsProps {
   chartData: WeatherChartData;
}

const Charts: React.FC<ChartsProps> = ({ chartData }) => {
   const countOfBlueHoursData = {
      data: {
         datasets: [
            {
               data: chartData.dailySummary,
               backgroundColor: "#6495ed",
            },
         ],
      },
      options: {
         plugins: {
            title: {},
            legend: {
               display: false,
            },
         },
         scales: {
            y: {
               beginAtZero: true,
               title: {
                  display: false,
                  text: "Blue Hours",
               },
            },
         },
         layout: {
            padding: 20,
         },
         barBorderWidth: 1,
         barBorderColor: "black",
         barBorderRadius: 1,
         maintainAspectRatio: false,
         responseive: true,
      },
   };

   const distributionChartData = {
      data: {
         datasets: [{
             data: chartData.dailySummaryDetailArray,
             backgroundColor: 'rgb(100 149 237)',
         }]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true,
                 reverse: true,
                 min: 8,
                 max: 20,
                 ticks: {
                     autoSkip: false,
                     stepSize: 4,
                     major: {
                         enabled: true,
                         stepSize: 1
                     },
                     callback: function (val) {
                         if (val > 12) {
                             val = val - 12;
                             return val + "PM"
                         } else if (val === 12) {
                             return val + "PM"
                         } else {
                             return val + "AM"
                         }
                     }
                 },
             },
             x: {
                 type: 'time', //indicate that the X axis is a time scale
                 time: {
                     unit: 'day' //with day as the unit
                 },
                 ticks: {
                     stepSize: 1,
                     callback: function (val) { //and modify the ticks such that we print e.g. Sun, Mon etc
                         //console.log(val)
                         let date = new Date(val).toString();
                         let trimmedDate = date.substr(0, 3)
                         //console.log(trimmedDate)
                         return trimmedDate
                     },
                 },
                 grid: {

                     offset: true
                 }
             }
         },
         elements: {
             point: {
                 pointStyle: 'rect'
             }
         },
         maintainAspectRatio: false,
         width: 200,
         plugins: {
             legend: {
                 display: false
             }
         }

     }
   }


   return (
      <div className="weather-chart-outline">
         <h2>Forecast Overview</h2>
         <div className="weather-charts-parent">
            <div className="two-chart-holder">
               <div className="weather-chart-holder detail-chart-holder">
                  <div className="weather-chart-inner">
                     <p>
                        <b>Distribution</b>
                     </p>
                     {/* <canvas id="weather-bubble-chart" /> */}
                     {/* <Bubble data={distributionChartData.data} options={distributionChartData.options}/> */}
                     <p className="smaller">When are the blue hours?</p>
                  </div>
               </div>
               <div className="weather-chart-holder">
                  <div className="weather-chart-inner">
                     <p>
                        <b>Count</b>
                     </p>
                     {/* <canvas id="weather-chart" /> */}
                     <Bar data={countOfBlueHoursData.data} options={countOfBlueHoursData.options} />
                     <p className="smaller">How many blue hours per day?</p>
                  </div>
               </div>
            </div>
            <div className="two-chart-holder">
               <div className="weather-chart-holder detail-chart-holder">
                  <div className="weather-chart-inner">
                     <p>
                        <b>Temperature / Dew Point</b>
                     </p>
                     <canvas id="dew-point-chart" />
                     <p className="smaller">
                        Hourly Temperature over dew point
                     </p>
                  </div>
               </div>
               <div className="weather-chart-holder detail-chart-holder">
                  <div className="weather-chart-inner">
                     <p>
                        <b>Temp - Dew Delta</b>
                     </p>
                     <canvas id="delta-chart" />
                     <p className="smaller">Higher delta = less fog</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Charts;
