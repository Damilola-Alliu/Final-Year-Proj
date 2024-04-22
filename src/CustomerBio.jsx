import React, { useState, useEffect } from 'react';
import './CustomerBio.css';
import CustomerNavbar from './Components/CustomerNavbar';
import axios from 'axios'; // Import axios for making HTTP requests

function CustomerBio() {
    const [address, setAddress] = useState({
        streetAddress: '',
        city: '',
        state: '',
        postalCode: ''
    });
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                // Make a GET request to retrieve customer details from the backend
                const response = await axios.get(`http://localhost:8000/customer-details/${userEmail}`);
                const customerDetails = response.data;
                console.log(customerDetails)

                // Update the state with the retrieved address
                setAddress({
                    streetAddress: customerDetails.street_address || '',
                    city: customerDetails.city || '',
                    state: customerDetails.state || '',
                    postalCode: customerDetails.postal_code || ''
                });
            } catch (error) {
                console.error('Error fetching customer details:', error);
                // Handle errors here
            }
        };

        // Call the fetchCustomerDetails function only when component mounts
        fetchCustomerDetails();
    }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const handleUpdateAddress = async () => {
        try {
            // Make a PUT request to update the customer's address in the backend
            await axios.put(`http://localhost:8000/customer-details/${userEmail}`, address);
    
            console.log('Address updated successfully');
            // Show alert message
            window.alert('Address updated successfully');
        } catch (error) {
            console.error('Error updating address:', error);
            // Handle errors here
        }
    };
    

    return (
        <>
            <CustomerNavbar />
            <div className='pg'>
                <div className='pg_ttl'>
                    Your Details
                </div>

                <div className='home_address'>
                    <div>
                        <label htmlFor="streetAddress">Street Address:</label>
                        <input type="text" id="streetAddress" name="streetAddress" value={address.streetAddress} onChange={handleAddressChange} />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} />
                    </div>
                    <div>
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" name="state" value={address.state} onChange={handleAddressChange} />
                    </div>
                    <div>
                        <label htmlFor="postalCode">Postal Code:</label>
                        <input type="text" id="postalCode" name="postalCode" value={address.postalCode} onChange={handleAddressChange} />
                    </div>
                    <button onClick={handleUpdateAddress}>Update Address</button>
                </div>
            </div>
        </>
    );
}

export default CustomerBio;
