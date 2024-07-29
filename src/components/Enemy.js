import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Enemy(props) {

    const enemy = useRef(null);
    const enemyTooltip = useRef(null); 

    useEffect(()=>{
        if(props.isEndCharacterTurn) {
            moveEnemy();
        }
    }, [props.isEndCharacterTurn])


    function moveEnemy(){
        let vector = props.isPositionCharacter - props.isPositionEnemy;
        switch(true){
            case (Math.abs(vector) === 20 || Math.abs(vector) === 1 ):
            break;
            case (vector > -20 && vector < -1):
                    props.changeEnemyPosition(props.isPositionEnemy + 1)
            break;
            case (vector < 20 && vector > 1):
                    props.changeEnemyPosition(props.isPositionEnemy - 1)
            break;
            case (vector >= -20):
                    props.changeEnemyPosition(props.isPositionEnemy + 20)
            break;
            case (vector <= 20):
                    props.changeEnemyPosition(props.isPositionEnemy - 20)
            break;
        }
        props.setIsEndCharacterTurn(false)
    }

    const deadClass = props.enemyHitPoints <= 0 ? 'enemy_dead' : 'enemy_alive'

    return (
        <>
            <div className={`enemy ${deadClass}`} ref={enemy} onMouseEnter={() => {props.showHitPoints(enemyTooltip, 'enemy')}} onMouseLeave={() => {props.hideHitPoints(enemyTooltip, 'enemy')}}>
                <p className="enemy__tooltip enemy__tooltip_hidden" ref={enemyTooltip}>
                    ПЗ: {props.enemyHitPoints}
                    <br/>Броня: {props.enemyArmorPoints}/{props.maxEnemyArmorPoints}
                    </p>
            </div>
        </>
    );
}

export default Enemy;
