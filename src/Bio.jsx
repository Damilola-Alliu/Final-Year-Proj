import React, { useState, useEffect } from 'react';
import './Bio.css';
import Service_ProviderNavbar from './Components/Service-ProviderNavbar';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function Bio() {
    const [email, setEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [location, setLocation] = useState('');
    const [services, setServices] = useState([""]);
    const [hourlyRate, setHourlyRate] = useState('');
    const [address, setAddress] = useState('');
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'YOUR_API_KEY',
    });
    
    useEffect(() => {
        // Retrieve email from localStorage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSelect = async (value) => {
        setAddress(value);
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setMapCenter(latLng);
        } catch (error) {
            console.error('Error fetching geolocation', error);
        }
    };

    
    const handleServiceChange = (index, value) => {
        const updatedServices = [...services];
        updatedServices[index] = value;
        setServices(updatedServices.slice(0, 3)); // Ensure there are only 3 items max
    };

    const addServiceField = () => {
        if (services.length < 3) {
            setServices([...services, ""]);
        }
    };

    const handleProfilePhotoChange = (event) => {
        const photoFile = event.target.files[0];
        // handle profile photo upload
    };

    return (
        <>
            <Service_ProviderNavbar />

            <div className='bio-page-title'>
                Your Bio
            </div>

            <div className="sign-up-form">
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        disabled
                    />

                    <label htmlFor="profile_photo">Profile Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                        required
                    />

                    <label htmlFor="location">Location</label>
                    <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Enter Location',
                                        className: 'location-search-input',
                                    })}
                                    required
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    {isLoaded && (
                        <GoogleMap
                            center={mapCenter}
                            zoom={12}
                            id="google-map"
                            mapContainerStyle={{ height: '300px', width: '100%', marginBottom: '20px' }}
                        ></GoogleMap>
                    )}

                    {services.map((service, index) => (
                        <div key={index}>
                            <label htmlFor={`service-${index}`}>Service {index + 1}</label>
                            <input
                                type="text"
                                placeholder={`Enter Service ${index + 1}`}
                                value={service}
                                onChange={(e) => handleServiceChange(index, e.target.value)}
                                required
                            />
                        </div>
                    ))}

                    <button type="button" onClick={addServiceField}>Add Service</button>
<br /><br /><br />
                    <label htmlFor="hourly_rate">Hourly Rate</label>
                    <input
                        type="number"
                        placeholder="Enter Hourly Rate"
                        name="hourly_rate"
                    />

                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    );
}

export default Bio;
