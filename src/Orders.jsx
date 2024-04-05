import React, { useState, useEffect } from "react";
import Service_ProvierNavbar from "./Components/Service-ProviderNavbar";
import axios from 'axios'; // Import Axios for making HTTP requests
import "./Orders.css"

function Orders() {
    const [bookings, setBookings] = useState([]);

    // Function to fetch bookings for the logged-in service provider
    const fetchBookings = async () => {
        try {
            // Replace 'loggedInServiceProviderEmail' with the email of the logged-in service provider
            const sp_email = localStorage.getItem('email')
            const loggedInServiceProviderEmail = sp_email;

            // Make a GET request to fetch bookings for the logged-in service provider
            const response = await axios.get(`http://localhost:8000/bookings/service-provider/${loggedInServiceProviderEmail}`);
            console.log(response.data)

            // Set the retrieved bookings in the state
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            // Handle error scenarios
        }
    };

    useEffect(() => {
        // Fetch bookings when the component mounts
        fetchBookings();
    }, []); // Empty dependency array ensures that this effect runs only once when the component mounts


    const AcceptTask = () => {
        console.log('Task Accepted')
    }

    const DeclineTask = () => {
        console.log('Task Declined')
    }

    return (
        <>
            <div className="orders-page">
                <div>
                    <Service_ProvierNavbar />
                </div>
                <div className="Page_title">
                    Your Orders
                </div>
            </div>
            <div className="Order-info">
                
                {bookings.map((booking, index) => (
                    <div key={index} className="booking-item">
                        
                        <p>Date: {booking.date}</p>
                        <p>Time: {booking.time}</p>
                        <p>Customer Email: {booking.customer_email}</p>
                        <p>Notes: {booking.notes}</p>
                        <p>Status: {booking.status}</p>

                        <br /> <br />
                        
                        <div className="Decline_Accept_button">
                            <button onClick={AcceptTask}>Accept</button>
                            <button onClick={DeclineTask}>Decline</button>
                        </div>
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default Orders;
