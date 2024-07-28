import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Character(props) {

    const [characterSelect, setCharacterSelect] = useState(props.characterMovePoints > 0 ? true : false);
    const vector = props.isPositionCharacter - props.isPositionEnemy;

    const character = useRef(null);
    const characterTooltip = useRef(null);

    useEffect(()=>{
        if(!props.isEndCharacterTurn) {
            setCharacterSelect(true)
            // props.setCharacterMovePoints(2);
        }
      }, [props.isEndCharacterTurn])

      useLayoutEffect(()=>{ 
        // console.log(props.characterMovePoints)
        if(props.characterMovePoints === 0 && !(Math.abs(vector) === 20 || Math.abs(vector) === 1)) {
            console.log('I END THIS TURN')
            props.setEndCharacterAttack(true)
        }
    }, [])
      
    useLayoutEffect(()=>{ 
        if(props.characterMovePoints === 0 && props.endCharacterAttack === true) {
            // console.log(vector)
            console.log('Ход завершен')
            props.setIsEndCharacterTurn(true)
            props.setCharacterMovePoints(2);
        }
      }, [props.endCharacterAttack])


    useLayoutEffect(()=>{
        if(characterSelect) {
            document.addEventListener('keypress', moveCharacter)
        }
        return () => {
            document.removeEventListener('keypress', moveCharacter)
        }
    }, [characterSelect])

    function cancellationOfMovement(currentVector, cancelingVector){
        if(currentVector !== cancelingVector)
            return true
    }

    function moveCharacter(event){
        console.log(props.characterMovePoints)
        if (props.characterMovePoints === 0) return
        switch(true){
            case (event.keyCode === 119 || event.keyCode === 1094):
                if(props.isPositionCharacter >= 20 && cancellationOfMovement(vector, 20)){
                    props.changeCharacterPosition(props.isPositionCharacter - 20)   
                    props.setCharacterMovePoints(props.characterMovePoints-1)
                }
            break;
            case (event.keyCode === 115 || event.keyCode === 1099):
                if(props.isPositionCharacter <= 259 && cancellationOfMovement(vector, -20)){
                    props.changeCharacterPosition(props.isPositionCharacter + 20)
                    props.setCharacterMovePoints(props.characterMovePoints-1)
                }
            break;
            case (event.keyCode === 100 || event.keyCode === 1074):
                if(props.isPositionCharacter % 20 !== 19 && cancellationOfMovement(vector, -1)){
                    props.changeCharacterPosition(props.isPositionCharacter + 1)   
                    props.setCharacterMovePoints(props.characterMovePoints-1)
                }
            break;
            case (event.keyCode === 97 || event.keyCode === 1092):
                if(props.isPositionCharacter % 20 !== 0 && cancellationOfMovement(vector, 1)){
                    props.changeCharacterPosition(props.isPositionCharacter - 1)   
                    props.setCharacterMovePoints(props.characterMovePoints-1)
                }
            break;
        }
    }

    const deadClass = props.characterHitPoints <= 0 ? 'character_dead' : 'character_alive'
    const selectClass = characterSelect && props.characterHitPoints > 0 ? 'character_pulse': 'character_inactive'; 

    return (
        <>
            <div className={`character ${deadClass} ${selectClass}`} ref={character} onMouseEnter={() => {props.showHitPoints(characterTooltip, 'character')}} onMouseLeave={() => {props.hideHitPoints(characterTooltip, 'character')}}>
                <p className="character__tooltip character__tooltip_hidden" ref={characterTooltip}>ПЗ: {props.characterHitPoints} <br/>Число ходов: {props.characterMovePoints}</p>
            </div>
        </>
    );
}

export default Character;
