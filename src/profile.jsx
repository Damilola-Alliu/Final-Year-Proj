import React, { useState, useEffect } from 'react';
import CustomerNavbar from './Components/CustomerNavbar';
import axios from 'axios';
import './profile.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            
            const email = localStorage.getItem('email');

            
            const response = await axios.get(`http://localhost:8000/users/${email}`);
            setUser(response.data);
        } catch (error) {
            setError('Error fetching user details');
        }
    };

    const DeleteAccount = () => {
        console.log('Delete Button Clicked!');
    };

    
    const EditProfileForm = () => {
       setIsOpen(!isOpen)
    };

    const SubmitEditProfile = () => {

    }

    

    return (
        <>
            <div>
                <CustomerNavbar />
                

                <div className='profile-page-title'>Your Profile</div>

                <div className='profile-info'>
                    <div>
                        <button className='edit-profile-btn' onClick={EditProfileForm}>Edit

                        </button>

                        {isOpen && (
                            <div className='edit-form'>
                                <div className='edit-form-content'>
                                    <h2>Edit your info</h2>
                                    <form action="">

                                      <label htmlFor="">Firstname</label>
                                      <input type="text" name="" id="" placeholder={user.firstname} />  
<br />
                                      <label htmlFor="">Lastname</label>
                                      <input type="text" placeholder={user.lastname} />
<br />
                                      <label htmlFor="">Email</label>
                                      <input type="text" placeholder={user.email} />
<br />
                                      <label htmlFor="">Password</label>
                                      <input type="text" placeholder={user.password} />
                                    <br />
                                    <button onClick={EditProfileForm}>Close</button> 
                                    <button onClick={SubmitEditProfile} className='submit-edit'>Submit</button>
                                    </form>
                                    
                                </div>
                            </div>
                        )

                        }
                    </div>

                    {user && (
                        <>
                            <li>
                                Email
                                <p>{user.email}</p>
                            </li>

                            <li>
                                Password <br />
                                <input type="password" value={user.password} disabled />
                            </li>

                            <li>
                                Firstname
                                <p>{user.firstname}</p>
                            </li>

                            <li>
                                Lastname
                                <p>{user.lastname}</p>
                            </li>

                            <li>
                                Role
                                <p>{user.role}</p>
                            </li>
                        </>
                    )}

                    <button onClick={DeleteAccount}>Delete Account</button>
                </div>

                {error && <div>{error}</div>}
            </div>
        </>
    );
}

export default Profile;