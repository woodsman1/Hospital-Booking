import React, { useState } from "react";
import { GrAdd } from "react-icons/Gr";

const TimeTable = ({ slot }) => {
  return (
    <>
      {slot.booked == true ? (
        <div className="card slot-area-booked">
          <div>
            <h3 style={{ marginLeft: "1%", fontFamily: "Aleo" }}>
              {slot.title}
            </h3>
            <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
              Start:{" "}
              <span style={{ fontWeight: "bold" }}>{slot.start_time}</span>
            </span>
            <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
              End: <span style={{ fontWeight: "bold" }}>{slot.end_time}</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="card slot-area" onClick={}>
          <div>
            <h3 style={{ marginLeft: "1%", fontFamily: "Aleo" }}>
              {slot.title}
            </h3>
            <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
              Start:{" "}
              <span style={{ fontWeight: "bold" }}>{slot.start_time}</span>
            </span>
            <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
              End: <span style={{ fontWeight: "bold" }}>{slot.end_time}</span>
            </span>
            <span
              style={{ float: "right", marginRight: "2%", marginBottom: "1%" }}
            >
              <GrAdd size={20}/>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default TimeTable;
