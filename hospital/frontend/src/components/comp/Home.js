import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import TimeTable from "./utilities/TimeTable";
import { updateTimeTable } from "./Request";

const Home = ({ authToken }) => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState();
  const [timeTable, setTimeTable] = useState([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    updateTimeTable(
      {
        name: day,
        date:
          "" +
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
      },
      authToken,
      setTimeTable
    );
  }, [day]);

  return (
    <>
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="date">
          <div className="datepicker">
            <span style={{ marginRight: "10px", fontFamily: "Aleo" }}>
              Select Date :-
            </span>
            <DatePicker
              value={date}
              onChange={(date) => {
                setDate(date);
                setDay(days[date.getDay()]);
              }}
              format="yyyy-MM-dd"
              minDate={new Date()}
            />
          </div>
        </div>

        <div className="time-table">
          <div className="card coustom-time-table">
            <p style={{ fontFamily: "Aleo", textAlign:"center"}}>Time Table</p>
            {timeTable.map((slot, index) =>
              <TimeTable key={"" + index}  slot={slot}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
