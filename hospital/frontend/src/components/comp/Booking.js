import React, { useEffect, useState } from 'react'
import { userBookingDetail } from "./utilities/Request";

const Booking = ({authToken}) => {

    const [Bookings, setBookings] = useState([])

    useEffect(()=>{
        userBookingDetail(authToken, setBookings)
    },[])

    return (
        <>
            
        </>
    )
}

export default Booking
