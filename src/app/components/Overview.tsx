"use client";
import Intro from "./Intro";
import Charts from "./Charts"


interface OverviewProps {
   lastUpdateTime: Date | null;
}

const Overview: React.FC<OverviewProps> = ({ lastUpdateTime }) => {
   const infoButtonClick = () => {
      console.log("info button click");
      const projectInfo = document.getElementById("project-info");
      projectInfo?.classList.toggle("hide");
   };

   return (
      <div className="title">
         <a className="smaller" href="https://dectronica.com/">
            &gt;&gt; Project by: Dectronica // Click to see more &lt;&lt;
         </a>
         <Intro />
         <div className="blue border-radius default-border">
            <button
               id="info-toggle"
               className="info-button"
               onClick={infoButtonClick}
            >
               i
            </button>
            <div className="summary-holder">
               <div className="weather-summary" id="weather-summary">
                  <h1>Sunset + Richmond Forecast</h1>
               </div>
               <div className="weather-chart-outline">
                  <h2>Forecast Overview</h2>
                  <div className="weather-charts-parent">
                     <div className="two-chart-holder">
                        <div className="weather-chart-holder detail-chart-holder">
                           <div className="weather-chart-inner">
                              <p>
                                 <b>Distribution</b>
                              </p>
                              <canvas id="weather-bubble-chart" />
                              <p className="smaller">
                                 When are the blue hours?
                              </p>
                           </div>
                        </div>
                        <div className="weather-chart-holder">
                           <div className="weather-chart-inner">
                              <p>
                                 <b>Count</b>
                              </p>
                              <canvas id="weather-chart" />
                              <p className="smaller">
                                 How many blue hours per day?
                              </p>
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
            </div>
            <div className="blue-info-container">
               <h2>What is a Blue Hour?</h2>
               <div className="blue-details">
                  <div className="param-container">
                     <ul className="blue-params">
                        <li>(TEMP-DEW) &gt; 5</li>
                        <p>
                           <b>AND</b>
                        </p>
                        <li>WIND &lt; 10 mph</li>
                     </ul>
                     <h2>OR</h2>
                     <ul className="blue-params">
                        <li>TEMP &gt; 65 deg</li>
                        <p>
                           <b>AND</b>
                        </p>
                        <li>DEW &lt; 60 deg</li>
                     </ul>
                  </div>
                  <br />
                  <p>
                     Days with hours like these, especially in the morning, seem
                     likely to be sunny as opposed to foggy / overcast in the
                     Sunset / Richmond
                  </p>
                  <br />
                  <p>
                     <u>NOTE</u>: This model is under active development.
                  </p>
               </div>
            </div>
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
