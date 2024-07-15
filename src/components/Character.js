import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Character(props) {

    const [characterSelect, setCharacterSelect] = useState(props.characterMovePoints > 0 ? true : false);
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


    useEffect(()=>{
        if(!props.isEndCharacterTurn) {
            props.setCharacterMovePoints(2);
            setCharacterSelect(true)
        }
      }, [props.isEndCharacterTurn])

    useEffect(()=>{
        if(characterSelect) {
            document.addEventListener('keypress', moveCharacter)
        }
        return () => {document.removeEventListener('keypress', moveCharacter)}
    }, [characterSelect])


    function moveCharacter(event){
        switch(true){
            case (event.keyCode === 119 || event.keyCode === 1094):
                if(props.isPositionCharacter >= 20)
                    props.changeCharacterPosition(props.isPositionCharacter - 20)
            break;
            case (event.keyCode === 115 || event.keyCode === 1099):
                if(props.isPositionCharacter <= 259)
                    props.changeCharacterPosition(props.isPositionCharacter + 20)
            break;
            case (event.keyCode === 100 || event.keyCode === 1074):
                if(props.isPositionCharacter % 20 !== 19)
                    props.changeCharacterPosition(props.isPositionCharacter + 1)
            break;
            case (event.keyCode === 97 || event.keyCode === 1092):
                if(props.isPositionCharacter % 20 !== 0)
                    props.changeCharacterPosition(props.isPositionCharacter - 1)
            break;
        }
        props.setCharacterMovePoints(props.characterMovePoints-1)
        if(props.characterMovePoints === 1) props.setIsEndCharacterTurn(true)
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
    }

    return (
        <>
            <div className={`character ${characterSelect ? 'character_pulse' : ''}`} ref={character} onMouseEnter={showHitPoints} onMouseLeave={hideHitPoints}>
                <p className="character__tooltip character__tooltip_hidden" ref={characterTooltip}>ПЗ: {characterHitPoints} <br/>Число ходов: {props.characterMovePoints}</p>
            </div>
        </>
    );
}

export default Character;
