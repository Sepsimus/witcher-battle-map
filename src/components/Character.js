import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

function Character(props) {

    const [openedAttackZone, setOpenedAttackZone] = React.useState(false)
    const [characterHitPoints, setCharacterHitPoints] = React.useState(35);

    useEffect(()=>{
        switch (true){
            case characterHitPoints === 35: 
                console.log('Здоров!')
                console.log(`Здоровье: ${characterHitPoints}`);
                break;
            case characterHitPoints < 35 && characterHitPoints > 25:
                console.log('Получил повреждения!')
                console.log(`Здоровье: ${characterHitPoints}`);
                break;
            case characterHitPoints < 25 && characterHitPoints > 5:
                console.log('Серьезные повреждения!')
                console.log(`Здоровье: ${characterHitPoints}`);
                break;
            case characterHitPoints < 5 && characterHitPoints > 0:
                console.log('Код красный!')
                console.log(`Здоровье: ${characterHitPoints}`);
                break;
            case characterHitPoints <= 0:
                console.log('Пульса нет...')
                console.log(`Здоровье: ${characterHitPoints}`);
                break;
        }
    },[characterHitPoints])

    function highlightingAttackZone(event){
        if(!openedAttackZone){
            const character = document.querySelector('.character');
            const attackZone = document.querySelector('.character__attack-zone')

            attackZone.classList.remove('character__attack-zone_hidden');
            character.setAttribute('draggable', false);
            setOpenedAttackZone(true)
        }
    }

    function showHitPoints(){
        setTimeout(() => {
            document.querySelector('.character__tooltip').classList.remove('character__tooltip_hidden')
        }, 300)
    }

    function hideHitPoints(){
        document.querySelector('.character__tooltip').classList.add('character__tooltip_hidden')
    }

    function attackAction(event, numberOfDice){
        console.log('Атака!')
        setCharacterHitPoints(characterHitPoints - props.throwD6Dice(numberOfDice));
        
        const character = document.querySelector('.character');
        const attackZone = document.querySelector('.character__attack-zone');
        character.setAttribute('draggable', true);
        attackZone.classList.add('character__attack-zone_hidden');
        setOpenedAttackZone(false)
    }

    return (
        <>
            <div className={`character`} draggable onClick={highlightingAttackZone} onMouseEnter={showHitPoints} onMouseLeave={hideHitPoints}>
                <div className='character__attack-zone character__attack-zone_hidden' draggable={false} onClick={(e) => {
                    attackAction(e, 4)
                    }
                }/>
                <p className="character__tooltip character__tooltip_hidden">ПЗ: {characterHitPoints}</p>
            </div>
        </>
    );
}

export default Character;
