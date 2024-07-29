import React, { useLayoutEffect, useEffect, useState } from 'react';
import Cell from './Cell';
import CharacterConfig from '../configuration/CharacterConfig';
import WeaponConfig from '../configuration/WeaponConfig';
import ArmorConfig from '../configuration/ArmorConfig';

function BattleMap(props) {

  const [characterPosition, setCharacterPosition] = useState(170)
  const [enemyPosition, setEnemyPosition] = useState(130)
  const [characterHitPoints, setCharacterHitPoints] = useState(CharacterConfig.hitPoints || 0);
  const [enemyHitPoints, setEnemyHitPoints] = useState(35);
  const [characterArmorPoints, setCharacterArmorPoints] = useState(ArmorConfig[CharacterConfig.armor].armorPoints || 0); // если нет CharacterConfig.armor упадет с ошибкой - добавь проверку!
  const characterDiceNumber = WeaponConfig[CharacterConfig.weapon].numberOfDice || 0; // если нет CharacterConfig.weapon упадет с ошибкой - добавь проверку!
  const characterDamageMod = WeaponConfig[CharacterConfig.weapon].damageMod; // если нет CharacterConfig.weapon упадет с ошибкой - добавь проверку!
  const [enemyArmorPoints, setEnemyArmorPoints] = useState(3);
  const maxEnemyArmorPoints = 3;
  const enemyDiceNumber = 2;
  const [endCharacterAttack, setEndCharacterAttack] = useState(false);

  function showHitPoints(tooltip, className){
    setTimeout(() => {
        tooltip.current.classList.remove(`${className}__tooltip_hidden`)
    }, 300)
  }

  function hideHitPoints(tooltip, className){
      tooltip.current.classList.add(`${className}__tooltip_hidden`)
  }

  function attackAction(numberOfDice, damageMod, setNewHitPoints, currentHitPoints, currentArmor, setNewArmor){
      let vector = Math.abs(characterPosition - enemyPosition);
      let currentDamage = props.throwD6Dice(numberOfDice) + damageMod;
      switch(vector){
          case 1: 
          case 20:
              if(currentArmor > 0 && currentArmor < currentDamage) setNewArmor(currentArmor - 1);
              currentDamage = currentDamage - currentArmor > 0 ? currentDamage - currentArmor : 0;
              setNewHitPoints(currentHitPoints - currentDamage)
          break;
      }
  }

  function attackTarget(event, target){
    switch(true){
      case (target === 'character'):
        console.log('Attack character')
        setEndCharacterAttack(false)
        attackAction(enemyDiceNumber, 0, setCharacterHitPoints, characterHitPoints, characterArmorPoints, setCharacterArmorPoints)
        props.setIsEndCharacterTurn(false)
      break;
      case (event.target.classList.contains('enemy')):
        console.log('Attack enemy')
        setEndCharacterAttack(true);
        attackAction(characterDiceNumber, characterDamageMod, setEnemyHitPoints, enemyHitPoints, enemyArmorPoints, setEnemyArmorPoints)
        props.setIsEndCharacterTurn(true)
      break;
    }
  }


  useEffect(()=>{
    if(!props.isEndCharacterTurn && enemyHitPoints > 0){
      attackTarget('', 'character')
    }
  }, [props.isEndCharacterTurn])

  function renderCells(numberOfCells){
    let array = [];
    for(let i = 0; i < numberOfCells; i++){
          array.push(
            <Cell 
              key={`cell_${i}`} 
              position={i} 
              isPositionEnemy={enemyPosition} 
              isPositionCharacter={characterPosition} 
              changeCharacterPosition={setCharacterPosition} 
              changeEnemyPosition={setEnemyPosition} 
              throwD6Dice={props.throwD6Dice}
              characterMovePoints={props.characterMovePoints}
              setCharacterMovePoints={props.setCharacterMovePoints}
              setIsEndCharacterTurn={props.setIsEndCharacterTurn}
              isEndCharacterTurn={props.isEndCharacterTurn}
              showHitPoints={showHitPoints}
              hideHitPoints={hideHitPoints}
              attackAction={attackAction}
              characterHitPoints={characterHitPoints}
              enemyHitPoints={enemyHitPoints}
              endCharacterAttack={endCharacterAttack}
              setEndCharacterAttack={setEndCharacterAttack}
              attackTarget={attackTarget}
              characterArmorPoints={characterArmorPoints}
              enemyArmorPoints={enemyArmorPoints}
              maxEnemyArmorPoints={maxEnemyArmorPoints}
            />)
  }
    return array;
  }

  return (
      <div className='battle-map' onClick={(e) => {attackTarget(e, )}}>
        {renderCells(280)}
      </div>
  );
}

export default BattleMap;
