import React, { useEffect, useState } from 'react';
import Character from './Character';
import Enemy from './Enemy';

function Cell(props) {

    const whosOccupied = props.position === props.isPositionEnemy ? 'cell_occupied cell_occupied-enemy' : props.position === props.isPositionCharacter ? 'cell_occupied cell_occupied-character' : 'cell_free'

    return (
        <div className={`cell ${'cell_'+props.position} ${whosOccupied}`}>
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
                enemyArmorPoints={props.enemyArmorPoints}
                maxEnemyArmorPoints={props.maxEnemyArmorPoints}
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
                    // showHitPoints={props.showHitPoints}
                    // hideHitPoints={props.hideHitPoints}
                    attackAction={props.attackAction}
                    characterHitPoints={props.characterHitPoints}
                    endCharacterAttack={props.endCharacterAttack}
                    setEndCharacterAttack={props.setEndCharacterAttack}
                    // characterArmorPoints={props.characterArmorPoints}
                />}
        </div>
    );
}

export default Cell;
