import React from "react";

const BookedSlots = ({ slot, authToken }) => {
  return (
    <>
      <div className=" slot-area-detail">
        <div className="slot-card">
          <h4 style={{ marginLeft: "1%", fontFamily: "Aleo" }}>
            {slot.date},<span>{" "+slot.slot_name}</span>
          </h4>
          <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
            Start:{" "}
            <span style={{ fontWeight: "bold" }}>{slot.slot_start}</span>
          </span>
          <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
            End:{" "}
            <span style={{ fontWeight: "bold" }}>{slot.slot_end}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default BookedSlots;
