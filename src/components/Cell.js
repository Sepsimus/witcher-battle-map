import React, { useEffect, useState } from 'react';
import Character from './Character';
import Enemy from './Enemy';

function Cell(props) {
    return (
        <div className={`cell ${'cell_'+props.position} ${props.position === props.isPositionEnemy ? 'cell_occupied' : ''}  ${props.position === props.isPositionCharacter ? 'cell_occupied' : ''}`}>
        {props.position === props.isPositionEnemy && 
            <Enemy 
                isPositionCharacter={props.isPositionCharacter}
                changeEnemyPosition={props.changeEnemyPosition}
                isPositionEnemy={props.isPositionEnemy}
                isEndCharacterTurn={props.isEndCharacterTurn}
                setIsEndCharacterTurn={props.setIsEndCharacterTurn}
                showHitPoints={props.showHitPoints}
                hideHitPoints={props.hideHitPoints}
                enemyHitPoints={props.enemyHitPoints}
                attackTarget={props.attackTarget}
            />}
            {props.position === props.isPositionCharacter && 
                <Character 
                    isPositionCharacter={props.isPositionCharacter}
                    isPositionEnemy={props.isPositionEnemy}
                    changeCharacterPosition={props.changeCharacterPosition}

                    characterMovePoints={props.characterMovePoints}
                    setCharacterMovePoints={props.setCharacterMovePoints}
                    isEndCharacterTurn={props.isEndCharacterTurn}
                    setIsEndCharacterTurn={props.setIsEndCharacterTurn}
                    showHitPoints={props.showHitPoints}
                    hideHitPoints={props.hideHitPoints}
                    attackAction={props.attackAction}
                    characterHitPoints={props.characterHitPoints}
                    endCharacterAttack={props.endCharacterAttack}
                    setEndCharacterAttack={props.setEndCharacterAttack}
                />}
        </div>
    );
}

export default Cell;
