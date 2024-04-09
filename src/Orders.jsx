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
            const sp_email = localStorage.getItem('email');
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

    // Function to handle accepting a task
    const acceptTask = async (bookingId) => {
        try {
            await axios.put(`http://localhost:8000/bookings/${bookingId}`, { status: 'Job Accepted' });
            // Fetch bookings again to reflect the updated status
            fetchBookings();
        } catch (error) {
            console.error('Error accepting task:', error);
            // Handle error scenarios
        }
    };

    // Function to handle declining a task
    const declineTask = async (bookingId, reason) => {
        try {
            await axios.put(`http://localhost:8000/bookings/${bookingId}`, { status: 'Job Declined', declineReason: reason });
            // Fetch bookings again to reflect the updated status
            fetchBookings();
        } catch (error) {
            console.error('Error declining task:', error);
            // Handle error scenarios
        }
    };

    // Function to render action statement based on booking status
    const renderActionStatement = (booking) => {
        if (booking.status === 'Job Accepted') {
            return <p>Task Accepted</p>;
        } else if (booking.status === 'Job Declined') {
            return <p>Task Declined</p>;
        }
        return (
            <div className="Decline_Accept_button">
                {/* Accept button */}
                <button onClick={() => acceptTask(booking.id)}>Accept</button>
                {/* Decline button */}
                <button onClick={() => {
                    const reason = prompt('Please provide a reason for declining:');
                    if (reason !== null && reason !== '') {
                        declineTask(booking.id, reason);
                    }
                }}>Decline</button>
            </div>
        );
    };

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
                        
                        {renderActionStatement(booking)}
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default Orders;
