import { Avatar,Button } from '@material-ui/core';
import { React, useState } from 'react'
import { GoogleLogout } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux'
import {
    selectSignedIn,
    selectUserData,
    setSignedIn,
    setUserData,
    setInput
} from '../UserSlice'
import './navbar.css';

const Navbar = () => {
    const [inputValue, setInputValue] = useState("tech ");
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();

    const logout = (response) => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    };
    const handleClick = (e) => {
        
        dispatch(setInput(inputValue));
        //e.preventdefault();
    };
    return (
        <div className="navbar" >
            <h1 className="navbar-header">Ashu Blog</h1>
            {isSignedIn && (
                <div className="blog-search">
                    <input
                        className="search"
                        placeholder="Search for a blog"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button 
                    className="submit" onClick={handleClick}
                    variant="contained" color="primary">
                    search
                          </Button>
                </div> 
            )}
            {isSignedIn ? (
                <div className="navbar-user-data">
                    <Avatar className="" src={userData?.imageUrl} alt={userData?.name} />
                    <h1 className="signedIn">{userData?.givenName}</h1>
                    <GoogleLogout
                        clientId="352299954988-ujcmd25rd4guvhcqligd9pciretvt7mt.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="logout-button"
                            >
                                Log Out
                            </button>
                        )}
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                    />
                </div>
            ) : <h1 className="notSignedIn">User not Available</h1>}
        </div>
    );
}

export default Navbar
