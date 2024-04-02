import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact Us";
import Signup from "./Sign-up";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CustomerHome from "./CustomerHome";
import ServiceProvider from "./ServiceProvider";
import Profile from "./profile";
import Bio from "./Bio";
import SearchResults from "./search-results";
import ServiceProvidersList from "./ServiceProvidersList";
import ProviderProfile from "./ProviderProfile";
import BookingForm from "./BookingForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/service-provider" element={<ServiceProvider />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/sp" element={<ServiceProvidersList />} />
        <Route path="/providerprofile/:email" element={<ProviderProfile />} />
        <Route path="/booking" element={<BookingForm />} />

        
      </Routes>
    </Router>
  );
}
