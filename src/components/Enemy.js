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
            case (vector > -20 && vector < -1):
                    props.changeEnemyPosition(props.isPositionEnemy - 1)
            break;
            case (vector < 20 && vector > 1):
                    props.changeEnemyPosition(props.isPositionEnemy + 1)
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

    return (
        <>
            <div className={`enemy`} ref={enemy} onMouseEnter={() => {props.showHitPoints(enemyTooltip, 'enemy')}} onMouseLeave={() => {props.hideHitPoints(enemyTooltip, 'enemy')}}>
                <p className="enemy__tooltip enemy__tooltip_hidden" ref={enemyTooltip}>ПЗ: {props.enemyHitPoints}</p>
            </div>
        </>
    );
}

export default Enemy;
