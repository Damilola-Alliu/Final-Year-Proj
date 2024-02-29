import react from "react";
import Navbar from "./Components/Navbar";
import "./Contact Us.css"

function Contact() {
    return(
        <>
        <Navbar/>

        <div className="contact-page">

            <div className="contact-title">
            Contact Us
            </div>

            <h2> We are here to help. Get in touch and we'll get back to you as soon as we can.</h2>

            

             <div className="contact-form">

             <div className="contact-form-title">
                Contact Form
            </div>

                <form action="">
                    <input type="text" placeholder="Full name"/>
                    <input type="text" placeholder="Email"/>
                    <textarea placeholder="How can we help you?"></textarea>

                    <button>Submit</button>
                </form>
             </div>

        </div>
        
        </>
    )
}

export default Contact;