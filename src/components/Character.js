import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

function Character() {

    function highlightingAtackZone(event){
        event.target.classList.toggle('character__atack-zone');
        if(event.target.classList.contains('character__atack-zone')){
            event.target.setAttribute('draggable', false);
            return
        }
        event.target.setAttribute('draggable', true)
    }

    return (
        <>
            <div className={`character`} draggable onClick={highlightingAtackZone}>
                {/* <div className='character__atack-zone' /> */}
            </div>
        </>
    );
}

export default Character;
