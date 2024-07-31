import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ArmorConfig from '../configuration/ArmorConfig';
import CharacterConfig from '../configuration/CharacterConfig';
import EnemyConfig from '../configuration/EnemyConfig';
import PercentOfHitConfig from '../configuration/PercentOfHitConfig';

function Enemy(props) {

    const characteristicsDiffForAttackCharacter = CharacterConfig.attackStat - EnemyConfig.defenceStat;
    const characteristicsDiffForAttackEnemy = EnemyConfig.attackStat - CharacterConfig.defenceStat;
    const percentIfAttackCharacter = characteristicsDiffForAttackCharacter > 6 ? `>${PercentOfHitConfig['6']['hit']+PercentOfHitConfig['6']['crit']}%` : characteristicsDiffForAttackCharacter < -6 ? `<${PercentOfHitConfig['-6']['hit']+PercentOfHitConfig['-6']['crit']}%` : `${PercentOfHitConfig[characteristicsDiffForAttackCharacter]['hit']+PercentOfHitConfig[characteristicsDiffForAttackCharacter]['crit']}%`;
    const percentIfAttackEnemy = characteristicsDiffForAttackEnemy > 6 ? `<${PercentOfHitConfig['6']['miss']}%` : characteristicsDiffForAttackEnemy < -6 ? `>${PercentOfHitConfig['-6']['miss']}%` : `${PercentOfHitConfig[characteristicsDiffForAttackEnemy]['miss']}%`;
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
                    <br/>Броня: {props.enemyArmorPoints}/{ArmorConfig[EnemyConfig.armor].armorPoints}
                    <br/>Шанс попасть по этому противнику: {percentIfAttackCharacter}
                    <br/>Шанс что ты защитишься от его атаки: {percentIfAttackEnemy}
                    </p>
            </div>
        </>
    );
}

export default Enemy;
