import React, { useLayoutEffect, useEffect, useState } from 'react';
import Cell from './Cell';
import CharacterConfig from '../configuration/CharacterConfig';
import WeaponConfig from '../configuration/WeaponConfig';
import ArmorConfig from '../configuration/ArmorConfig';
import InformationBar from './InformationBar';

function BattleMap(props) {

  // Character Params Block
  const [characterPosition, setCharacterPosition] = useState(170)
  const [characterHitPoints, setCharacterHitPoints] = useState(CharacterConfig.hitPoints || 0);
  const [characterArmorPoints, setCharacterArmorPoints] = useState(ArmorConfig[CharacterConfig.armor].armorPoints || 0); // если нет CharacterConfig.armor упадет с ошибкой - добавь проверку!
  const characterDiceNumber = WeaponConfig[CharacterConfig.weapon].numberOfDice || 0; // если нет CharacterConfig.weapon упадет с ошибкой - добавь проверку!
  const characterDamageMod = WeaponConfig[CharacterConfig.weapon].damageMod; // если нет CharacterConfig.weapon упадет с ошибкой - добавь проверку!
  const characterDefStat = CharacterConfig.defenceStat;
  const characterAttackStat = CharacterConfig.attackStat;
  const [endCharacterAttack, setEndCharacterAttack] = useState(false);

  //Enemy Params Block
  const [enemyPosition, setEnemyPosition] = useState(130)
  const [enemyHitPoints, setEnemyHitPoints] = useState(35);
  const [enemyArmorPoints, setEnemyArmorPoints] = useState(3);
  const enemyDefStat = 10;
  const enemyAttackStat = 20;
  const maxEnemyArmorPoints = 3;
  const enemyDiceNumber = 5;
  
  function showHitPoints(tooltip, className){
    setTimeout(() => {
        tooltip.current.classList.remove(`${className}__tooltip_hidden`)
    }, 300)
  }

  function hideHitPoints(tooltip, className){
      tooltip.current.classList.add(`${className}__tooltip_hidden`)
  }

  function attackAction(numberOfDice, damageMod, setNewHitPoints, currentHitPoints, currentArmor, setNewArmor, attackStat, defStat){
      let sumOfAttackRoll = attackStat + props.throwD10Dice(1);
      let sumOfDefRoll = defStat + props.throwD10Dice(1);
      let currentDamage = props.throwD6Dice(numberOfDice) + damageMod;
      if(sumOfAttackRoll > sumOfDefRoll){
        // console.log('Ты попал!')
        // console.log('На атаке выпало: '+ sumOfAttackRoll);
        // console.log('На защите выпало: '+ sumOfDefRoll);
        if(currentArmor < currentDamage) {
          // console.log('Ты пробил!')
          if(currentArmor > 0) setNewArmor(currentArmor - 1);
          currentDamage = currentDamage - currentArmor > 0 ? currentDamage - currentArmor : 0;
          let newHitPoints = currentHitPoints - currentDamage > 0 ? currentHitPoints - currentDamage : 0; 
          setNewHitPoints(newHitPoints);
        }else {
          // console.log('Но не пробил...')
          // console.log('Твой урон: '+ currentDamage)
          // console.log('Броня врага: ' + currentArmor)
        }
      } else {
        // console.log('Ты не попал!')
        // console.log('На атаке выпало: '+ sumOfAttackRoll);
        // console.log('На защите выпало: '+ sumOfDefRoll);
      } 
  }

  function attackTarget(event, target){
    let vector = Math.abs(characterPosition - enemyPosition);
    if (!(vector === 1 || vector === 20)){
      console.log('Стоишь не смежно!');
      return;
    }
    switch(true){
      case (target === 'character'):
        console.log('Attack character')
        setEndCharacterAttack(false)
        attackAction(enemyDiceNumber, 0, setCharacterHitPoints, characterHitPoints, characterArmorPoints, setCharacterArmorPoints, enemyAttackStat, characterDefStat)
        props.setIsEndCharacterTurn(false)
      break;
      case (event.target.classList.contains('enemy') && characterHitPoints > 0):
        console.log('Attack enemy')
        setEndCharacterAttack(true);
        attackAction(characterDiceNumber, characterDamageMod, setEnemyHitPoints, enemyHitPoints, enemyArmorPoints, setEnemyArmorPoints, characterAttackStat, enemyDefStat)
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
              // characterArmorPoints={characterArmorPoints}
              enemyArmorPoints={enemyArmorPoints}
              maxEnemyArmorPoints={maxEnemyArmorPoints}
            />)
  }
    return array;
  }

  return (
      <div className='battle-map' onClick={(e) => {attackTarget(e, )}}>
        <InformationBar 
          characterArmorPoints={characterArmorPoints}
          characterHitPoints={characterHitPoints}
          characterMovePoints={props.characterMovePoints}
        />
        {renderCells(280)}
      </div>
  );
}

export default BattleMap;
