import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Character(props) {

    const [characterSelect, setCharacterSelect] = useState(props.characterMovePoints > 0 ? true : false);

    const character = useRef(null);
    const characterTooltip = useRef(null);

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
        return () => {
            document.removeEventListener('keypress', moveCharacter)
        }
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

    return (
        <>
            <div className={`character ${characterSelect ? 'character_pulse' : ''}`} ref={character} onMouseEnter={() => {props.showHitPoints(characterTooltip, 'character')}} onMouseLeave={() => {props.hideHitPoints(characterTooltip, 'character')}}>
                <p className="character__tooltip character__tooltip_hidden" ref={characterTooltip}>ПЗ: {props.characterHitPoints} <br/>Число ходов: {props.characterMovePoints}</p>
            </div>
        </>
    );
}

export default Character;
