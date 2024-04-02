import React, { useState } from "react";
import CustomerNavbar from "./Components/CustomerNavbar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./BookingForm.css";

function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <CustomerNavbar />
      <div className="pg-title">
        Schedule Task
      </div>
      <div className="question_haha">
        <p>When would you like me to come?</p>
      </div>


      <div className="booking_form">
        <form onSubmit={handleSubmit}>
          
          <br />
          <br />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
          
          <div>
            <p className="Time">What Time</p>
          </div>
          <br />
          <br />

        <div className="TimeSelection">
            <label htmlFor="">9:00AM</label>
            <input type="radio" name="time" id="9am" />

            <label htmlFor="">10:00AM</label>
            <input type="radio" name="time" id="10am" />

            <label htmlFor="">11:00AM</label>
            <input type="radio" name="time" id="11am" />

            <label htmlFor="">12:00PM</label>
            <input type="radio" name="time" id="12pm" />

            <label htmlFor="">1:00PM</label>
            <input type="radio" name="time" id="1pm" />

            <label htmlFor="">2:00PM</label>
            <input type="radio" name="time" id="2pm" />

            <label htmlFor="">3:00PM</label>
            <input type="radio" name="time" id="3pm" />

            <label htmlFor="">4:00PM</label>
            <input type="radio" name="time" id="4pm" />

            <label htmlFor="">5:00PM</label>
            <input type="radio" name="time" id="5pm" />

            <label htmlFor="">6:00PM</label>
            <input type="radio" name="time" id="6pm" />

            <label htmlFor="">7:00PM</label>
            <input type="radio" name="time" id="7pm" />

            <label htmlFor="">8:00PM</label>
            <input type="radio" name="time" id="8pm" />
        </div>
            

          <br /><br />
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
}

export default BookingForm;
