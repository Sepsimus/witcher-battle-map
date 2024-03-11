import React, { useLayoutEffect, useRef, useState } from 'react';

function Character(props) {

    const [openedAttackZone, setOpenedAttackZone] = useState(false)
    const [characterHitPoints, setCharacterHitPoints] = useState(35);

    const character = useRef(null);
    const characterTooltip = useRef(null);
    const attackZone = useRef(null);

    useLayoutEffect(()=>{
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
    }, [characterHitPoints])

    function highlightingAttackZone(event){
        if(openedAttackZone){
            return
        }
        attackZone.current.classList.remove('character__attack-zone_hidden');
        character.current.setAttribute('draggable', false);
        setOpenedAttackZone(true)
    }

    function showHitPoints(){
        setTimeout(() => {
            characterTooltip.current.classList.remove('character__tooltip_hidden')
        }, 300)
    }

    function hideHitPoints(){
        characterTooltip.current.classList.add('character__tooltip_hidden')
    }

    function attackAction(event, numberOfDice){
        console.log('Атака!')
        setCharacterHitPoints(characterHitPoints => characterHitPoints - props.throwD6Dice(numberOfDice));
        character.current.setAttribute('draggable', true); // different entry: character.current.draggable = true;
        attackZone.current.classList.add('character__attack-zone_hidden');
        setOpenedAttackZone(false)
    }

    return (
        <>
            <div className={`character`} ref={character} draggable onClick={highlightingAttackZone} onMouseEnter={showHitPoints} onMouseLeave={hideHitPoints}>
                <div className='character__attack-zone character__attack-zone_hidden' ref={attackZone} draggable={false} onClick={(e) => {
                    attackAction(e, 4)
                    }
                }/>
                <p className="character__tooltip character__tooltip_hidden" ref={characterTooltip}>ПЗ: {characterHitPoints}</p>
            </div>
        </>
    );
}

export default Character;
