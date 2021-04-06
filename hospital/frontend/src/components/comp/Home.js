import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return (
    <>
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="date">
          <div className="datepicker">
            <span style={{ marginRight: "10px" }}>Select Date :-</span>
            <DatePicker
              value={date}
              onChange={(date) => {
                setDate(date);
                setDay(days[date.getDay()]);
              }}
              format="yyyy-MM-dd"
              minDate={new Date()}
              //   filterDate = {(date) => { setDay(date.getDay())}}
            />
          </div>
        </div>

        <div className="time-table">Time Table</div>
      </div>
    </>
  );
};

export default Home;
