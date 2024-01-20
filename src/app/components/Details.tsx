"use client";
import { ParsedWeatherPeriod } from "../types/types";
import { getDayOfWeek } from "../utils/dateUtils";
import styles from "./Details.module.css";

interface DetailsProps {
   parsedForecast: ParsedWeatherPeriod[];
}

const Details: React.FC<DetailsProps> = ({ parsedForecast }) => {
   const printForecast = (objects: ParsedWeatherPeriod[]) => {
      return objects.map((object: ParsedWeatherPeriod) => {
         // Create a grid cell element
         let cell = document.createElement("div");
         cell.className = "grid-cell";

         //console.log("Windspeed:" + object.windSpeed);
         let windSpeedRatio = object.windSpeed / 20; // used to help calculate the scale of wind arrows
         let scale = 75 * windSpeedRatio; //where the first value is the max scale the arrow can grow to

         let qualityCategory = 0;
         if (object.goodConditions) {
            //this is the good category!
            //console.log("category 0");
            qualityCategory = 0;
         }

         if (!object.goodConditions) {
            //this is the not so good category
            //console.log("category 1");
            qualityCategory = 1;
         }

         let dayOfWeek = getDayOfWeek(object.date);

         //generate a unique key to put on the JSX div
         const key = `${object.date}-${object.time}`;

         return (
            <div key={key}>
               <div
                  className="weather-entry category-${qualityCategory}"
                  id="${dayOfWeek.toLowerCase()}"
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
                           className="${object.windDirection} arrow"
                           src="./assets/img/pointer-${qualityCategory}.png"
                           alt="^"
                           style={{ height: "${scale}px" }}
                        />
                     </div>
                  </div>
               </div>
            </div>
         );
      });
   };

   const _printForecast = (objects: ParsedWeatherPeriod[]) => {
      console.log(objects);
      const weatherEntries = [];
      for (let i = 0; i < objects.length; i++) {
         let object: ParsedWeatherPeriod = objects[i];

         // Create a grid cell element
         let cell = document.createElement("div");
         cell.className = "grid-cell";

         console.log("Windspeed:" + object.windSpeed);
         let windSpeedRatio = object.windSpeed / 20; // used to help calculate the scale of wind arrows
         let scale = 75 * windSpeedRatio; //where the first value is the max scale the arrow can grow to

         let qualityCategory = 0;
         if (object.goodConditions) {
            //this is the good category!
            //console.log("category 0");
            qualityCategory = 0;
         }

         if (!object.goodConditions) {
            //this is the not so good category
            //console.log("category 1");
            qualityCategory = 1;
         }

         let dayOfWeek = getDayOfWeek(object.date);

         // Populate the cell with object data
         cell.innerHTML = `
            <div class="weather-entry category-${qualityCategory}" id="${dayOfWeek.toLowerCase()}">
                <div class="weather-time">${dayOfWeek} ${object.date} @ ${
            object.time
         }:00</div>
                <div class="weather-data">
                    <div class="weather-temperature">
                        <div class="weather-item">
                            <div><u>TEMP</u></div>
                            <div>${object.temperature}</div>
                        </div>
                        <div class="weather-item">
                            <div><u>DEW</u></div>
                            <div>${object.dewpoint}</div>
                        </div>
                        <div class="weather-item">
                            <div><u>WIND</u></div>
                            <div>${object.windSpeed}</div>
                        </div>

                    </div>
                    <div class="weather-wind">

                        <img class="${
                           object.windDirection
                        } arrow" src="./assets/img/pointer-${qualityCategory}.png" alt="^" style="height: ${scale}px;"></div>
                    </div>
                </div>
            `;

         // Append the cell to the grid container
         weatherEntries.push(cell);
      }
      return weatherEntries;
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
         <div className="grid" id="grid" />
         {printForecast(parsedForecast)}
      </div>
   );
};

export default Details;
