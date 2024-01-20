const BlueHourDescription = () =>{
    return (
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
    )
}

export default BlueHourDescription