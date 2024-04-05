import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import CustomerNavbar from "./Components/CustomerNavbar";
import "./ProviderProfile.css";

function ProviderProfile() {
    const { email } = useParams();
    const [providerProfile, setProviderProfile] = useState(null);
    const [providerProfile2, setProviderProfile2] = useState([]);

    useEffect(() => {
        const fetchProviderProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/users/${email}`);
                const response2 = await axios.get(`http://localhost:8000/service-providers/${email}`);

                console.log("Profile 1:", response)
                console.log("Profile 2:", response2.data)
                setProviderProfile(response.data);
                setProviderProfile2(response2.data);
            } catch (error) {
                console.error("Error fetching provider profile:", error);
            }
        };

        fetchProviderProfile();
    }, [email]);

    if (!providerProfile || providerProfile2.length === 0) {
        return <div>Loading...</div>;
    }

    const BookMeBtn = () => {
        console.log("Booking form opened")
    };

    return (
        <>
            <CustomerNavbar />
            <div className="provider-container">
                <h2>{providerProfile.firstName} {providerProfile.lastName}</h2>
                <p>Email: {providerProfile.email}</p>
                <p>Name: {providerProfile.firstname} {providerProfile.lastname}</p>
                <p>Location: {providerProfile2.location}</p>
                <p>Hourly Rate: {providerProfile2.hourly_rate}</p>
                <p>Bio: <br />{providerProfile2.bio}</p>
                <br />

                <div className="btn">
                    <Link to={`/booking/${email}`}>
                        <button onClick={BookMeBtn}>Book Me</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ProviderProfile;
