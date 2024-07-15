import React, { useEffect, useState } from 'react';
import Character from './Character';
import Enemy from './Enemy';

function Cell(props) {
    return (
        <div className={`cell ${'cell_'+props.position}`}>
        {props.position === props.isPositionEnemy && 
            <Enemy 
                throwD6Dice={props.throwD6Dice}
                isPositionCharacter={props.isPositionCharacter}
                changeEnemyPosition={props.changeEnemyPosition}
                isPositionEnemy={props.isPositionEnemy}
                isEndCharacterTurn={props.isEndCharacterTurn}
                setIsEndCharacterTurn={props.setIsEndCharacterTurn}
            />}
            {props.position === props.isPositionCharacter && 
                <Character 
                    throwD6Dice={props.throwD6Dice}
                    isPositionCharacter={props.isPositionCharacter}
                    changeCharacterPosition={props.changeCharacterPosition}
                    characterMovePoints={props.characterMovePoints}
                    setCharacterMovePoints={props.setCharacterMovePoints}
                    setIsEndCharacterTurn={props.setIsEndCharacterTurn}
                />}
        </div>
    );
}

export default Cell;
