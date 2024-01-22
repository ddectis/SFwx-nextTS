"use client";
import { ParsedWeatherPeriod } from "../types/types";
import { getDayOfWeek } from "../utils/dateUtils";
import styles from "./Details.module.css";
import Image from "react";

interface DetailsProps {
   parsedForecast: ParsedWeatherPeriod[];
}

/**
 * The Details component prints each hour of the received forecast data
 * @param {ParsedWeatherPeriod[]} parsedForecast - the output of the parseForecast.ts util function
 * @returns JSX for each hour of the forecast data
 */
const Details: React.FC<DetailsProps> = ({ parsedForecast }) => {
   const printForecast = (objects: ParsedWeatherPeriod[]) => {
      return objects.map((object: ParsedWeatherPeriod) => {
         // Create a grid cell element
         let cell = document.createElement("div");
         cell.className = "grid-cell";

         //console.log("Windspeed:" + object.windSpeed);
         let windSpeedRatio = object.windSpeed / 20; // used to help calculate the scale of wind arrows
         let scale = 75 * windSpeedRatio; //where the first value is the max scale the arrow can grow to

         let qualityCategory = "category0";
         if (object.goodConditions) {
            //this is the good category!
            //console.log("category 0");
            qualityCategory = "category0";
         }

         if (!object.goodConditions) {
            //this is the not so good category
            //console.log("category 1");
            qualityCategory = "category1";
         }

         let dayOfWeek = getDayOfWeek(object.date);

         //generate a unique key to put on the JSX div
         const key = `${object.date}-${object.time}`;

         return (
            <div
               className={[styles.weatherEntry, styles[qualityCategory]].join(
                  " "
               )}
               id="${dayOfWeek.toLowerCase()}"
               key={key}
            >
               <div className="weather-time">
                  {dayOfWeek} {object.date} @ {object.time}:00
               </div>
               <div className={styles.weatherData}>
                  <div className="weather-temperature">
                     <div className="weather-item">
                        <div>
                           <u>TEMP</u>
                        </div>
                        <div>{object.temperature}</div>
                     </div>
                     <div className="weather-item">
                        <div>
                           <u>DEW</u>
                        </div>
                        <div>{object.dewpoint}</div>
                     </div>
                     <div className="weather-item">
                        <div>
                           <u>WIND</u>
                        </div>
                        <div>{object.windSpeed}</div>
                     </div>
                  </div>
                  <div className="weather-wind">
                     <img
                        className={[
                           styles[object.windDirection],
                           styles.arrow,
                        ].join(" ")}
                        src={`./img/pointer-${qualityCategory}.png`}
                        alt="^"
                        style={{ height: `${scale}px` }}
                     />
                  </div>
               </div>
            </div>
         );
      });
   };

   return (
      <div className="detailed-forecast-holder">
         <h1>Detailed Forecast</h1>
         <div className="filter-holder">
            <p>Filter day of the week</p>
            <div className="days-of-week">
               <button id="sunday">Sunday</button>
               <button id="monday">Monday</button>
               <button id="tuesday">Tuesday</button>
               <button id="wednesday">Wednesday</button>
               <button id="thursday">Thursday</button>
               <button id="friday">Friday</button>
               <button id="saturday">Saturday</button>
               <button id="all-days">All</button>
            </div>
            <label>
               <input type="checkbox" id="only-blue-hours" />
               Show Only Blue Hours
            </label>
         </div>
         <div className="grid" id="grid">
            {printForecast(parsedForecast)}
         </div>
      </div>
   );
};

export default Details;
