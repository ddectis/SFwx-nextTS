const Details = () => {
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
    </div>
  );
};

export default Details;
