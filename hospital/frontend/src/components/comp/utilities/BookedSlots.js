import React from "react";
import { deleteBookedSlot } from "./Request";
import { MdDelete } from "react-icons/Md";

const BookedSlots = ({ slot, authToken, change, setChange }) => {
  const onDelete = () => {
    deleteBookedSlot({ id: slot.id }, authToken);
    setChange(!change);
  };

  return (
    <>
      <div className=" slot-area-detail">
        <div className="slot-card">
          <h4 style={{ marginLeft: "1%", fontFamily: "Aleo" }}>
            {slot.date},<span>{" " + slot.slot_name}</span>
          </h4>
          <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
            Start: <span style={{ fontWeight: "bold" }}>{slot.slot_start}</span>
          </span>
          <span style={{ marginLeft: "2%", fontFamily: "Aleo" }}>
            End: <span style={{ fontWeight: "bold" }}>{slot.slot_end}</span>
          </span>
          <span
            style={{ float: "right", marginRight: "2%", marginBottom: "1%" }}
          >
            <MdDelete size={25} color="red" cursor="pointer" onClick={onDelete} />
          </span>
        </div>
      </div>
    </>
  );
};

export default BookedSlots;
