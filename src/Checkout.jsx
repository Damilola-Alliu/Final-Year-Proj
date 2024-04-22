import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CustomerNavbar from './Components/CustomerNavbar';
import './Checkout.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51P7H89B9yZduzV1JtQNZUAwgjRfO3BeVWMygrJSTV7LeyugzaII3fvqZUeBJgG7q7Ft63yMo43v6ac1wnMOXLclL00gkIlqy7C');

const CheckoutForm = ({ paymentAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Check if card details are empty
        if (!stripe || !elements || !elements.getElement(CardElement)) {
            setPaymentError('Please enter your card details.');
            return;
        }
    
        // Check if payment amount is empty
        if (!paymentAmount) {
            setPaymentError('Please enter the payment amount.');
            return;
        }
    
        setPaymentLoading(true);
    
        const cardElement = elements.getElement(CardElement);
    
        try {
            // Your payment handling logic goes here
        } catch (error) {
            console.error('Error:', error);
            setPaymentError('An error occurred. Please try again.');
            setPaymentLoading(false);
        }
    };
    

    return (
        <div className="checkout-container">
            <div className='pg_ttl'>
                Checkout
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Card details</label>
                    <CardElement />
                </div>
                <div className="form-group">
                    <label>Payment Amount:</label>
                    <span>{paymentAmount} USD</span>
                </div>
                <button type="submit" disabled={paymentLoading} className="checkout-button">
    {paymentLoading ? 'Processing...' : 'Pay Now'}
</button>
                {paymentError && <div className="payment-error">{paymentError}</div>}
            </form>
        </div>
    );
};


const Checkout = () => (
    <>
        <div>
            <CustomerNavbar />
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentAmount={100} /> {/* Set payment amount here */}
            </Elements>
        </div>
    </>
);

export default Checkout;
