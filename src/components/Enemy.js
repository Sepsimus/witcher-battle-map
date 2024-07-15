import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Enemy(props) {

    const [enemyHitPoints, setEnemyHitPoints] = useState(35);

    const enemy = useRef(null);
    const enemyTooltip = useRef(null);

    useLayoutEffect(()=>{
        switch (true){
            case enemyHitPoints === 35: 
                console.log('Здоров!')
                console.log(`Здоровье: ${enemyHitPoints}`);
                break;
            case enemyHitPoints < 35 && enemyHitPoints > 25:
                console.log('Получил повреждения!')
                console.log(`Здоровье: ${enemyHitPoints}`);
                break;
            case enemyHitPoints < 25 && enemyHitPoints > 5:
                console.log('Серьезные повреждения!')
                console.log(`Здоровье: ${enemyHitPoints}`);
                break;
            case enemyHitPoints < 5 && enemyHitPoints > 0:
                console.log('Код красный!')
                console.log(`Здоровье: ${enemyHitPoints}`);
                break;
            case enemyHitPoints <= 0:
                console.log('Пульса нет...')
                console.log(`Здоровье: ${enemyHitPoints}`);
                break;
        }
    }, [enemyHitPoints])    

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

    function showHitPoints(){
        setTimeout(() => {
            enemyTooltip.current.classList.remove('enemy__tooltip_hidden')
        }, 300)
    }

    function hideHitPoints(){
        enemyTooltip.current.classList.add('enemy__tooltip_hidden')
    }

    return (
        <>
            <div className={`enemy`} ref={enemy} onMouseEnter={showHitPoints} onMouseLeave={hideHitPoints}>
                <p className="enemy__tooltip enemy__tooltip_hidden" ref={enemyTooltip}>ПЗ: {enemyHitPoints}</p>
            </div>
        </>
    );
}

export default Enemy;
