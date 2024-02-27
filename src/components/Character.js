import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

function Character() {


    const [characterHitPoints, setCharacterHitPoints] = React.useState(35);

    function highlightingAttackZone(event){
        const character = document.querySelector('.character');
        const attackZone = document.querySelector('.character__attack-zone')

        attackZone.classList.toggle('character__attack-zone_hidden');
        if(!attackZone.classList.contains('character__attack-zone_hidden')){
            character.setAttribute('draggable', false);
            return
        }
        character.setAttribute('draggable', true)
    }

    function showHitPoints(){
        setTimeout(() => {
            document.querySelector('.character__tooltip').classList.remove('character__tooltip_hidden')
        }, 300)
    }

    function hideHitPoints(){
        document.querySelector('.character__tooltip').classList.add('character__tooltip_hidden')
    }

    function attackAction(){
        
    }

    return (
        <>
            <div className={`character`} draggable onClick={highlightingAttackZone} onMouseEnter={showHitPoints} onMouseLeave={hideHitPoints}>
                <div className='character__attack-zone character__attack-zone_hidden' draggable={false} onClick={attackAction}/>
                <p className="character__tooltip character__tooltip_hidden">ПЗ: {characterHitPoints}</p>
            </div>
        </>
    );
}

export default Character;
