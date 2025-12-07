import React from 'react';
import './door.scss'
const Door = () => {
    return (
        <div className="space-container">
            <div className='door-container'>
                <div className="front"></div>
                <div className="back"></div>
                <div className="lft"></div>
                <div className="ight"></div>
                <div className="top"></div>
                <div className="bottom"></div>
            </div>
        </div>

    );
};

export default Door;
