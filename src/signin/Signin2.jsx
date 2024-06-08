import React, { useEffect, useState } from 'react';
import "./Signin.css"
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import { signin } from '../services/services';
import logo from "../assets/logo.png";


const Signin2 = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const cookies = new Cookies();
    
    const login = (jwt_token) => {
        cookies.set("jwt_authorization", jwt_token);
        navigate("/users");
    };

    const handleLogin = async () => {
        try {
            const token = await signin(username, password);
            login(token);
        } catch (error) {
          setErrorMessage('There was an error during login.'); 
          console.error('Error during login:', error);
        }
      };

    return (
        <div className="containerSignin">
            <div className="header">
                <img src={logo} height={100} />
                <div className="text">
                    Put your credentials from config.
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="email" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="error">
            {errorMessage && <p>{errorMessage}</p>}
            </div>
            <button className="sumbitContainer" onClick={handleLogin}>
                <div className="submit">Sign in</div>
            </button>
        </div>
    )
}

export default Signin2;