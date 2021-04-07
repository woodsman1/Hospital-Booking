import React, { useEffect, useState } from "react";
import BookedSlots from "./utilities/BookedSlots";
import { userBookingDetail } from "./utilities/Request";

const Booking = ({ authToken }) => {
  const [Bookings, setBookings] = useState([]);
  const [change, setChange] = useState(true)

  const username = localStorage.getItem("username");

  useEffect(() => {
    userBookingDetail(authToken, setBookings);
  }, []); 
  
  useEffect(() => {
    userBookingDetail(authToken, setBookings);
  }, [change]); 
  
  return (
    <>
      <div className="container mr-5">
        <h3 style={{ fontFamily: "Aleo", textAlign: "center", marginTop:"2%", marginBottom:"2%" }}>
          User Id : {username}
        </h3>
        {Bookings.map((slot, index) => (
              <BookedSlots
                key={"" + index}
                slot={slot}
                authToken={authToken}
                change = {change}
                setChange={setChange}
              />
            ))}
      </div>
    </>
  );
};

export default Booking;
