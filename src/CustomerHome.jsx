import react from "react";
import CustomerNavbar from "./Components/CustomerNavbar"
import "./CustomerHome.css"


function CustomerHome() {


    const firstname = localStorage.getItem('firstname');
    return(
        <>
        <CustomerNavbar/>

        <div className="welcome-messages">
            <p>Welcome to TaskCraft, <b>{firstname}</b></p>
        </div>

        <div className="service-provider">
            Find a service provider

            <div className="input-search">
                <input type="search" placeholder="Search for a service..." className="search"/>
            </div>

            <div className="popular-services">
                Popular Services
            </div>

            <div className="popular-services-containers">
            <ul>
                <li>Plumbing</li>
                <li>Electrician</li>
                <li>Handyman</li>
                <li>House Cleaning</li>
                <li>Appliance repair</li>
                <li>Carpet Cleaning</li>
                <li>Furniture assembly</li>
                <li>Movers</li>
                <li>Junk removal</li>
                <li>Lawn mowing</li>
            </ul>

            </div>

            <div className="most-viewed">
                Most viewed service providers
                </div>

                <div className="service-list">

                <div className="electricians"></div>
                <h2></h2>

                <div className="electricians"></div>
                
                
                <div className="electricians"></div>
                
                
                <div className="electricians"></div>
                
                
                <div className="electricians"></div>
                
                
                <div className="electricians"></div>
                
                
                <div className="electricians"></div>
                
                
                <div className="electricians"></div>
                
                
                <div className="electricians"></div>
                
                

            </div>
        </div>
        </>
    )
}

export default CustomerHome;