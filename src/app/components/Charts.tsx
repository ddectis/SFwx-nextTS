const Charts = () =>{
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
    )
}

export default Charts