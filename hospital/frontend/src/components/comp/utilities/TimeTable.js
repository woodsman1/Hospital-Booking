import React, { useState } from "react";
import { GrAdd } from "react-icons/Gr";
import { BookSlot } from "./Request";

const TimeTable = ({ slot, date, day, authToken }) => {
  const [change, setchange] = useState(true);

  const onBook = () => {
    if (authToken === "") {
      alert("Please login to Book the Slot");
      return;
    }
    const id = localStorage.getItem("id");
    BookSlot(
      {
        user_id: id,
        date:
          "" +
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
        name: day,
        slot_id: slot.pk,
      },
      authToken
    );
    alert(
      "You have booked that slot. Please check your Booked Slots for detail"
    );
    slot.booked = true;
    setchange(!change);
  };

  return (
    <>
      {slot.booked == true ? (
        <div className="card slot-area-booked">
          <div>
            <h4 style={{ marginLeft: "1%", fontFamily: "Aleo" }}>
              {slot.title}
            </h4>
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
        <div className="card slot-area" onClick={onBook}>
          <div>
            <h4 style={{ marginLeft: "1%", fontFamily: "Aleo" }}>
              {slot.title}
            </h4>
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
              <GrAdd size={20} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default TimeTable;
