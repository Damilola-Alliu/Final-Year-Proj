import React, { useState, useEffect } from "react";
import CustomerNavbar from "./Components/CustomerNavbar";
import axios from 'axios'; // Import Axios for making HTTP requests
import "./CustomerOrders.css"

function CustomerOrders() {
    const [bookings, setBookings] = useState([]);

    // Function to fetch bookings for the logged-in service provider
    const fetchBookings = async () => {
        try {
            // Replace 'loggedInServiceProviderEmail' with the email of the logged-in service provider
            const customer_email = localStorage.getItem('email')
            const loggedInCustomerEmail = customer_email;

            // Make a GET request to fetch bookings for the logged-in service provider
            const response = await axios.get(`http://localhost:8000/bookings/customer_email/${loggedInCustomerEmail}`);
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


    // const AcceptTask = () => {
    //     console.log('Task Accepted')
    // }

    // const DeclineTask = () => {
    //     console.log('Task Declined')
    // }

    return (
        <>
            <div className="orders-page">
                <div>
                    <CustomerNavbar />
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
                        <p>Service Provider's Email: {booking.service_provider_email}</p>

                        <br /> <br />
                        
                        {/* <div className="Decline_Accept_button">
                            <button onClick={AcceptTask}>Accept</button>
                            <button onClick={DeclineTask}>Decline</button>
                        </div> */}
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default CustomerOrders;
