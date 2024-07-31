import React, { useLayoutEffect, useEffect, useState } from 'react';
import Cell from './Cell';
import CharacterConfig from '../configuration/CharacterConfig';
import WeaponConfig from '../configuration/WeaponConfig';
import ArmorConfig from '../configuration/ArmorConfig';
import InformationBar from './InformationBar';
import EnemyConfig from '../configuration/EnemyConfig';
import Log from './Log';

function BattleMap(props) {

  const [logInformation, setLogInformation] = useState(null);
  const [arrayLogs, setArrayLogs] = useState([]);
  let creatingLogString = '';

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
  const [enemyHitPoints, setEnemyHitPoints] = useState(EnemyConfig.hitPoints || 0);
  const [enemyArmorPoints, setEnemyArmorPoints] = useState(ArmorConfig[EnemyConfig.armor].armorPoints || 0);
  const enemyDefStat = EnemyConfig.defenceStat;
  const enemyAttackStat = EnemyConfig.attackStat;
  const enemyDiceNumber = WeaponConfig[EnemyConfig.weapon].numberOfDice;
  const enemyDamageMod = WeaponConfig[EnemyConfig.weapon].damageMod; // если нет CharacterConfig.weapon упадет с ошибкой - добавь проверку!
  
  function showHitPoints(tooltip, className){
    setTimeout(() => {
        tooltip.current.classList.remove(`${className}__tooltip_hidden`)
    }, 300)
  }

  function hideHitPoints(tooltip, className){
      tooltip.current.classList.add(`${className}__tooltip_hidden`)
  }

  function checkCriticalHit(attackRoll, defenceRoll){
    const differenceinThrow = attackRoll - defenceRoll;
    let dopDamage = 0;
    switch(true){
      case (differenceinThrow >= 15):
        dopDamage = 10
        console.log('Ты нанес Смертельный крит!')
      break;
      case (differenceinThrow >= 13):
        dopDamage = 8
        console.log('Ты нанес Тяжелый крит!')
      break;
      case (differenceinThrow >= 10):
        dopDamage = 5
        console.log('Ты нанес Средний крит!')
      break;
      case (differenceinThrow >= 7):
        dopDamage = 3
        console.log('Ты нанес Легкий крит!')
      break;
    }
    return dopDamage;
  }

  function attackAction(numberOfDice, damageMod, setNewHitPoints, currentHitPoints, currentArmor, setNewArmor, attackStat, defStat){
      let sumOfAttackRoll = attackStat + props.throwD10Dice(1);
      let sumOfDefRoll = defStat + props.throwD10Dice(1);
      if(sumOfAttackRoll > sumOfDefRoll){
        creatingLogString += `и попадает(сложность: ${sumOfDefRoll}, выпало: ${sumOfAttackRoll}) `;
        let currentDamage = props.throwD6Dice(numberOfDice) + damageMod + checkCriticalHit(sumOfAttackRoll, sumOfDefRoll);
        if(currentArmor < currentDamage) {
          creatingLogString += `пробивая броню (урон: ${currentDamage - currentArmor}) `
          setLogInformation(creatingLogString)
          if(currentArmor > 0) setNewArmor(currentArmor - 1);
          currentDamage = currentDamage - currentArmor > 0 ? currentDamage - currentArmor : 0;
          let newHitPoints = currentHitPoints - currentDamage > 0 ? currentHitPoints - currentDamage : 0; 
          setNewHitPoints(newHitPoints);
        } else {
          creatingLogString += `но не пробивает броню (урон: ${currentDamage}, броня: ${currentArmor}) `
        }
      } else {
        creatingLogString += `и промахивается(сложность: ${sumOfDefRoll}, выпало: ${sumOfAttackRoll}) `
        setLogInformation(creatingLogString)
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
        creatingLogString = 'Враг атакует персонажа ';
        setEndCharacterAttack(false)
        attackAction(enemyDiceNumber, enemyDamageMod, setCharacterHitPoints, characterHitPoints, characterArmorPoints, setCharacterArmorPoints, enemyAttackStat, characterDefStat)
        props.setIsEndCharacterTurn(false)
      break;
      case (event.target.classList.contains('enemy') && characterHitPoints > 0):
        creatingLogString = 'Персонаж атакует врага ';
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

  useEffect(()=>{
      setArrayLogs(arrayLogs => [...arrayLogs, <Log key={Math.random().toString(16)} logInformation={logInformation}/>])
  },[logInformation])

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
              enemyArmorPoints={enemyArmorPoints}
            />)
  }
    return array;
  }

  return (
      <div className='battle-map' onClick={(e) => {attackTarget(e, )}}>          
        <div className="battle-map__logs-wrapper">
          {arrayLogs}
        </div>
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
