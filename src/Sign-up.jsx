import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import "./Sign-up.css";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        role: "" 
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.phoneNumber)

        try {
            const response = await axios.post("http://localhost:8000/signup", formData);
            console.log(response.data); 

            if (response.data.success) {
                alert("User profile created successfully");
                
            } else {
                setError(response.data.error || "An error occurred while creating user profile");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while creating user profile");
        }
    };

    return (
        <>
            <div className="">
                <Navbar />
            </div>

            <div>
                <div className="page-title">
                    <h2>Create an account</h2>
                </div>

                <div className="sign-up-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="firstname">First name</label>
                        <input
                            type="text"
                            placeholder="Enter first name"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="lastname">Last name</label>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="service-provider">Service Provider</option>
                        </select>

                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
        </>
    );
}

export default Signup;
