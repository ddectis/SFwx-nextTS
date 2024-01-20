"use client";
import Intro from "./Intro";
import Charts from "./Charts"
import BlueHourDescription from "./BlueHourDescription";


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
               <Charts />
            </div>
            <BlueHourDescription/>
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
