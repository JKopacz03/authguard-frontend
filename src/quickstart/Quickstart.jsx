import React, { useEffect, useState } from 'react';
import "./Quickstart.css"
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import logo from "../assets/logo.png";



const Quickstart = () => {

    return (
        <div className="qcontainer">
            <div className="header">
             <img src={logo} height={100} />
            </div>
            <div className="header2">
                Quickstart
            </div>
            <div className="header3"><br/>1. Fix your properties bro</div>
            <div className="text2">
                How to start using AuthGuard? <br/><br/>
                Go to your docker-compose, and change credentials. Also app as default is using h2 database, you can change it on your own also there. 
                <br/><br/>
                AuthGuard is supporting h2, postgresql and mysql. 
                <br/><br/>
                <img src={one} width={730}/>
            </div>
            <div className="header3"><br/>2. Configure security in your main app</div>
            <div className="text2">
                2.1 Next lets configure your app.
                <br/><br/>
                For first step we must add jwt conventer, because AuthGuard is sending
                all roles, and permissions by jwt token, and spring dont recognize that as authorities.
                <br/><br/>
                Just add to your config package <a target="_blank" href="https://github.com/JKopacz03/AuthGuardConfigExample/blob/main/src/main/java/com/kopacz/SimpleApp/config/JwtAuthConverter.java">this JwtConventer. </a>
                <br/><br/>
                2.2 Then you can configure your <a target="_blank" href="https://github.com/JKopacz03/AuthGuardConfigExample/blob/main/src/main/java/com/kopacz/SimpleApp/config/SecurityConfig.java">FilterChain.</a>
                <br/><br/>Just add outh2 resource server, with jwt conventer. If u are using spring cloud, use WebFlux Security.<br/><br/>
                <img src={two} width={730}/>
                <br/><br/>
                2.3 Next, fix your properites in main app, add <a target="_blank" href="https://github.com/JKopacz03/AuthGuardConfigExample/blob/main/src/main/resources/application.yml">oauth2 config</a>, don't use other than then bellow.
                <br/><br/>
                <img src={three} width={730}/>
                <br/><br/>
            </div>
            <div className="header3"><br/>3. AuthGuard public api for users</div>
            <div className="text2">Create user</div>
            <div className='code'>
            POST http://localhost:7777/auth/add-user
            <br/><br/>
            with request body username, password
            </div>
            <div className="text2">Generate token</div>
            <div className='code'>
            POST http://localhost:7777/auth/generate-token
            <br/><br/>
            with request body username, password
            </div>
            <div className="text2">Generate refresh token</div>
            <div className='code'>
            POST http://localhost:7777/auth/refresh-token
            <br/><br/>
            with request body refreshToken
            </div>
            <div className="text2">Modify password</div>
            <div className='code'>
            PATCH http://localhost:7777/auth/reset-password
            <br/><br/>
            with request body username, currentPassword, newPassword
            </div>
        </div>
    )
}

export default Quickstart;