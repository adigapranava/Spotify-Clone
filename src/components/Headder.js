import React from 'react'
import logo from '../Images/logo.png'

export default function Headder() {
    return (
        <div className="headder item item1">
            <div className="headder-text">
                <img src={logo} alt="logo" />
                <h2>Spotify Clone</h2>
            </div>
        </div>
    )
}
