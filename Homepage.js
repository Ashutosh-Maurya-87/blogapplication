import render from "dom-serializer";
import React from "react";
import {Button } from '@material-ui/core';
import GoogleLogin from "react-google-login";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectSignedIn, setSignedIn, setUserData } from "../UserSlice";
import './homepage.css'

const Homepage = () => {
    const dispatch = useDispatch()
    const login = (response) => {
        console.log(response);
        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj));
    };
    const isSignedIn = useSelector(selectSignedIn)
    return (
        <div className="home-page" style={{ display:isSignedIn ? "none" : " "}}>
        { !isSignedIn && (
           <div className="login-message">
                <h2>Hi, Welcome</h2>
                <h1>A reader favourite place</h1>
                <p>
                    we provide greate facility.
                </p>
                <GoogleLogin
                    clientId="352299954988-ujcmd25rd4guvhcqligd9pciretvt7mt.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button 
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="login-button"
                    variant="contained" color="primary">
                    Login with Google
                          </Button>
                       
                    )}
                    onSuccess={login}
                    onFailure={login}
                    isSignedIn={true}
                    //cookiePolicy={"single-host-origin"}
                />
            </div> 
     ) }  
            </div>
            );
};
            export default Homepage;