import React from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   TimeScale,
   PointElement,
   LineElement,
   BarElement,
   Legend,
   Tooltip,
} from "chart.js/auto";
import BubbleElement from "chart.js/auto";
ChartJS.register(
   CategoryScale,
   LinearScale,
   TimeScale,
   PointElement,
   LineElement,
   BarElement,
   Tooltip,
   Legend
);
import { Line, Bubble, Bar } from "react-chartjs-2";
import { WeatherChartData } from "../types/types";
import { getNumericalDate } from "../utils/dateUtils";

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
         datasets: [
            {
               data: chartData.dailySummaryDetailArray,
               backgroundColor: "rgb(100 149 237)",
            },
         ],
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
                     stepSize: 1,
                  },
                  callback: function (val: string | number) {
                     if (typeof val === "number") {
                        if (val > 12) {
                           val = val - 12;
                           return val + "PM";
                        } else if (val === 12) {
                           return val + "PM";
                        } else {
                           return val + "AM";
                        }
                     }
                  },
               },
            },
            x: {
               //   type: 'time', //indicate that the X axis is a time scale
               //   time: {
               //       unit: 'day' //with day as the unit
               //   },
               //   ticks: {
               //       stepSize: 1,
               //       callback: function (val: Date): string { //and modify the ticks such that we print e.g. Sun, Mon etc
               //           //console.log(val)
               //           let date = new Date(val).toString();
               //           let trimmedDate = date.substr(0, 3)
               //           //console.log(trimmedDate)
               //           return trimmedDate
               //       },
               //   },
               grid: {
                  offset: true,
               },
            },
         },
         elements: {
            point: {
               pointStyle: "rect",
            },
         },
         maintainAspectRatio: false,
         width: 200,
         plugins: {
            legend: {
               display: false,
            },
         },
      },
   };

   const currentDate = new Date();
   const currentHour = currentDate.getHours();
   const currentDay = currentDate.getDay();

   const daysOfWeek = [
      "SUN",
      "MON",
      "TUE",
      "WED",
      "THU",
      "FRI",
      "SAT",
      "SUN",
      "MON",
      "TUE",
      "WED",
   ];

   const tempDewData = {
      data: {
         labels: chartData.dewPointPeriods,
         data: chartData.dewPointData,
         datasets: [
            {
               label: "Dewpoint",
               data: chartData.dewPointData,
               fill: false,
               borderColor: "rgb(0, 0, 0)",
               tension: 0.2,
            },
            {
               label: "Temperature",
               data: chartData.tempData,
               fill: false,
               borderColor: "rgb(100, 149, 237)",
               tension: 0.2,
            },
         ],
      },
      options: {
         pointRadius: 0,
         scales: {
            y: {
               ticks: {},
            },
            x: {
               title: {
                  display: true,
                  text: "Hours",
               },
               ticks: {
                  display: true,                 
                  callback: function (val: number) {
                     console.log(val);
                     let hour = val + currentHour;
                     let hourofDay = hour % 24;
                     //console.log(hourofDay);
                     if (hour > 23 && hour < 47) {
                        if (hourofDay <= 12) {
                        }
                        return daysOfWeek[currentDay + 1];
                     }
                     if (hour >= 47 && hour < 72) {
                        return daysOfWeek[currentDay + 2];
                     }
                     if (hour >= 72) {
                        return daysOfWeek[currentDay + 3];
                     }
                     return daysOfWeek[currentDay];
                  },
               },
               max: 78,
            },
         },
         elements: {},
         maintainAspectRatio: false,
         width: 200,
         plugins: {
            legend: {
               display: false,
            },
         },
      },
   };

   const deltaChartData = {
      data: {
         labels: chartData.dewPointPeriods,

         datasets: [
            {
               label: "Delta",
               data: chartData.deltaData,
               fill: false,
               borderColor: "rgb(100, 149, 237)",
               tension: 0.2,
            },
         ],
      },
      options: {
         pointRadius: 0,
         scales: {
            y: {
               ticks: {},
            },
            x: {
               ticks: {
                  callback: function (val: number) {
                     let hour = val + currentHour;
                     if (hour >= 23 && hour < 47) {
                        return daysOfWeek[currentDay + 1];
                     }
                     if (hour >= 47 && hour < 72) {
                        return daysOfWeek[currentDay + 2];
                     }
                     if (hour >= 72) {
                        return daysOfWeek[currentDay + 3];
                     }
                     return daysOfWeek[currentDay];
                  },
               },
               max: 78,
            },
         },
         elements: {},
         maintainAspectRatio: false,
         width: 200,
         plugins: {
            legend: {
               display: false,
            },
         },
      },
   };

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
                     <Bubble data={distributionChartData.data} />
                     <p className="smaller">When are the blue hours?</p>
                  </div>
               </div>
               <div className="weather-chart-holder">
                  <div className="weather-chart-inner">
                     <p>
                        <b>Count</b>
                     </p>
                     {/* <canvas id="weather-chart" /> */}
                     <Bar
                        data={countOfBlueHoursData.data}
                        options={countOfBlueHoursData.options}
                     />
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
                     {/* <canvas id="dew-point-chart" /> */}
                     <Line
                        data={tempDewData.data}
                        options={tempDewData.options}
                     />
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
                     {/* <canvas id="delta-chart" /> */}
                     <Line data={deltaChartData.data} options={deltaChartData.options} />
                     <p className="smaller">Higher delta = less fog</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Charts;
