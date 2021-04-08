import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import TimeTable from "./utilities/TimeTable";
import { updateTimeTable } from "./utilities/Request";

const Home = ({ authToken }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(days[date.getDay()]);
  const [timeTable, setTimeTable] = useState([]);

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
  }, []);

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
          <div className="coustom-time-table">
            <h4 style={{ fontFamily: "Aleo", textAlign: "center" }}>
              Time Table
            </h4>
            {timeTable.map((slot, index) => (
              <TimeTable
                key={"" + index}
                slot={slot}
                date={date}
                day={day}
                authToken={authToken}
              />
            ))}
            <br />
          </div>
          <br/>
          <p> *Click On White Slots to Book that slot</p>
          <p> *Click Booked Slots to see your Booked Slot</p>
        </div>
      </div>
    </>
  );
};

export default Home;
