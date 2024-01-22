"use client";
import Intro from "./Intro";
import Charts from "./Charts";
import BlueHourDescription from "./BlueHourDescription";
import { WeatherSummary } from "../types/types";

interface OverviewProps {
   lastUpdateTime: Date | null;
   weatherSummary: WeatherSummary | null;
}

const Overview: React.FC<OverviewProps> = ({
   lastUpdateTime,
   weatherSummary,
}) => {
   /**
    * Handles the case where there might only be 1 blue hour
    * @param longestBlueHourStreak: it'll be undefined when the app loads, then a number once we get data
    * @returns 
    */
   const hourOrHours = (longestBlueHourStreak: number | undefined) => {
      if (longestBlueHourStreak === 1) {
         return "hour";
      } else {
         return "hours";
      }
   };

   /**
    * Takes in the total number of blue hours and determines the grade for the week
    * @param countOfBlueHours 
    * @returns 
    */

   const calculateGrade = (countOfBlueHours: number | undefined) => {
      if (countOfBlueHours !== undefined) {
         if (countOfBlueHours <= 14) {
            return `F`;
         } else if (countOfBlueHours > 14 && countOfBlueHours <= 21) {
            return `D`;
         } else if (countOfBlueHours > 21 && countOfBlueHours <= 28) {
            return `C`;
         } else if (countOfBlueHours > 28 && countOfBlueHours <= 35) {
            return `B`;
         } else if (countOfBlueHours > 35 && countOfBlueHours <= 42) {
            return `A`;
         } else if (countOfBlueHours > 42) {
            return `A+`;
         }
      }
   };

   return (
      <div className="title">
         <a className="smaller" href="https://dectronica.com/">
            &gt;&gt; Project by: Dectronica // Click to see more &lt;&lt;
         </a>

         <div className="blue border-radius default-border">
            
            <div className="summary-holder">
               <div className="weather-summary" id="weather-summary">
                  <h1>Sunset + Richmond Forecast</h1>
                  <div>
                     <div className="forecast-summary-entry">
                        <u>Best Looking Day:</u> <br /> On{" "}
                        <b>{weatherSummary?.dayWithLongestBlueStreak} </b>
                        there will be a streak of{" "}
                        <b>
                           {weatherSummary?.longestBlueHourStreak}{" "} blue{" "}
                           {hourOrHours(weatherSummary?.countOfBlueHours)}!
                        </b>
                     </div>
                     <div className="forecast-summary-entry">
                        <u>Weekly Blue Score:</u> <br />
                        <h1>{weatherSummary?.countOfBlueHours}</h1>
                     </div>
                     <div className="forecast-summary-entry">
                        <u>Grade:</u> <br />
                        <h1>
                           {calculateGrade(weatherSummary?.countOfBlueHours)}
                        </h1>
                     </div>
                  </div>
               </div>
               <Charts />
            </div>
            <BlueHourDescription />
            <h3 id="last-updated">
               {lastUpdateTime !== undefined && lastUpdateTime !== null && (
                  <>
                     Forecast Data Last Updated:{" "}
                     {lastUpdateTime.toLocaleTimeString()}
                  </>
               )}
            </h3>
         </div>
      </div>
   );
};

export default Overview;
