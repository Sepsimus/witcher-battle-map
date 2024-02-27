import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

function Character() {

    const character = document.querySelector('.character');

    const [characterHitPoints, setCharacterHitPoints] = React.useState(35);

    function highlightingAtackZone(event){
        event.target.classList.toggle('character_atack-zone');
        if(event.target.classList.contains('character_atack-zone')){
            event.target.setAttribute('draggable', false);
            return
        }
        event.target.setAttribute('draggable', true)
    }

    function showHitPoints(){
        setTimeout(() => {
            document.querySelector('.character__tooltip').classList.remove('character__tooltip_hidden')
        }, 300)
    }

    function hideHitPoints(){
        document.querySelector('.character__tooltip').classList.add('character__tooltip_hidden')
    }

    return (
        <>
            <div className={`character`} draggable onClick={highlightingAtackZone} onMouseEnter={showHitPoints} onMouseLeave={hideHitPoints}>
                <p className="character__tooltip character__tooltip_hidden">ПЗ: {characterHitPoints}</p>
            </div>
        </>
    );
}

export default Character;
