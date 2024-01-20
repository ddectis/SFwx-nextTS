const Intro = () =>{
    
    
    return (
        <div className="sub-title hide" id="project-info">
            <div className="title-and-cell">
              <h1>
                <u>Danometer</u>
              </h1>
              <img
                className="cell"
                src="./assets/img/cell-1.jpg"
                alt="The map cell indicated on this page"
              />
            </div>
            <div className="intro-text">
              <h3>
                This forecast is based on the National Weather Service data for
                the Central + Outer Sunset. The goal here is to use that data to
                highlight hours conducive to clear skies.
              </h3>
              <h3>I call them Blue Hours.</h3>
              <h3>
                When the temperature is far enough from the dew point and the
                winds are light, or when the forecasted temperature is high
                enough, we've got a better chance of sunshine than marine layer.
              </h3>
              <h3>
                This is a work in progress. I'd love to hear your feedback at{" "}
                <a
                  style={{ fontSize: "unset" }}
                  href="mailto:dandectis@gmail.com"
                >
                  <b>DanDectis@gmail.com</b>
                </a>
              </h3>
            </div>
          </div>
    )
}

export default Intro