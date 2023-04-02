import './style.css'

import NotFoundImage from 'assets/not-found-frog.png'
import React from 'react'
import { locationPaths } from 'data/location-paths';
import { useNavigate } from 'react-router'

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className='not-found'>
            <img alt='' src={NotFoundImage}></img>
            <div className='info'>
                <h1>Emmm... Co Ty tutaj robisz?</h1>
                <span>Taka strona nie istnieje. Wracajmy w bezpieczne miejsce...</span>
                <button className='our-button' onClick={() => navigate(locationPaths.home)}>Zabierz mnie stąd...</button>
            </div>
        </div>
    )
}

export default NotFoundPage;