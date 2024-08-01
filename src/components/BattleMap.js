import React, { useLayoutEffect, useEffect, useState } from 'react';
import Cell from './Cell';
import CharacterConfig from '../configuration/CharacterConfig';
import WeaponConfig from '../configuration/WeaponConfig';
import ArmorConfig from '../configuration/ArmorConfig';
import InformationBar from './InformationBar';
import EnemyConfig from '../configuration/EnemyConfig';
import Log from './Log';

function BattleMap(props) {

  const [logInformation, setLogInformation] = useState('');
  const [arrayLogs, setArrayLogs] = useState([]);
  let creatingLogString = '';

  // Character Params Block
  const [characterPosition, setCharacterPosition] = useState(170)
  const [characterHitPoints, setCharacterHitPoints] = useState(CharacterConfig.hitPoints || 0);
  const [characterEndurancePoints, setCharacterEndurancePoints] = useState(CharacterConfig.endurancePoints || 0);
  const [characterArmorPoints, setCharacterArmorPoints] = useState(ArmorConfig[CharacterConfig.armor].armorPoints || 0); // если нет CharacterConfig.armor упадет с ошибкой - добавь проверку!
  const characterDiceNumber = WeaponConfig[CharacterConfig.weapon].numberOfDice || 0; // если нет CharacterConfig.weapon упадет с ошибкой - добавь проверку!
  const characterDamageMod = WeaponConfig[CharacterConfig.weapon].damageMod; // если нет CharacterConfig.weapon упадет с ошибкой - добавь проверку!
  const characterDefStat = CharacterConfig.defenceStat;
  const characterAttackStat = CharacterConfig.attackStat;
  const [endCharacterAttack, setEndCharacterAttack] = useState(false);

  //Enemy Params Block
  const [enemyPosition, setEnemyPosition] = useState(130)
  const [enemyHitPoints, setEnemyHitPoints] = useState(EnemyConfig.hitPoints || 0);
  const [enemyEndurancePoints, setEnemyEndurancePoints] = useState(EnemyConfig.endurancePoints || 0);
  const [enemyArmorPoints, setEnemyArmorPoints] = useState(ArmorConfig[EnemyConfig.armor].armorPoints || 0);
  const enemyNumberOfAttack = EnemyConfig.numberOfAttack;
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

  function attackAction(attackType, numberOfDice, damageMod, setNewHitPoints, currentHitPoints, currentArmor, setNewArmor, attackStat, defStat, endurancePoints, setEndurancePoints){
      let sumOfAttackRoll = attackType === 'strong' ? attackStat + props.throwD10Dice(1) - 3 : attackStat + props.throwD10Dice(1);
      let sumOfDefRoll = defStat + props.throwD10Dice(1);
      if(sumOfAttackRoll > sumOfDefRoll){
        creatingLogString += `и попадает(сложность: ${sumOfDefRoll}, выпало: ${sumOfAttackRoll}) `;
        let currentDamage = props.throwD6Dice(numberOfDice) + damageMod + checkCriticalHit(sumOfAttackRoll, sumOfDefRoll);
        if(attackType === 'strong') currentDamage *= 2;
        if(currentArmor < currentDamage) {
          creatingLogString += `пробивая броню (урон: ${currentDamage - currentArmor}) `
          if(currentArmor > 0) setNewArmor((currentArmor) => currentArmor - 1);
          currentDamage = currentDamage - currentArmor > 0 ? currentDamage - currentArmor : 0;
          setNewHitPoints((currentHitPoints) => currentHitPoints - currentDamage > 0 ? currentHitPoints - currentDamage : 0);
        } else {
          creatingLogString += `но не пробивает броню (урон: ${currentDamage}, броня: ${currentArmor}) `
         }
      } else {
        creatingLogString += `и промахивается(сложность: ${sumOfDefRoll}, выпало: ${sumOfAttackRoll}) `
      }
      let newEndurancePoints = attackType==='strong' ? endurancePoints-3 : endurancePoints-1;
      console.log(creatingLogString)
      setEndurancePoints(newEndurancePoints > 0 ? newEndurancePoints : 0) //заменить тут как с новым ХП и новой броней
      setLogInformation((x) => x + creatingLogString)
  }

  function checkingForAdjacency(){
    let vector = Math.abs(characterPosition - enemyPosition);
    if (!(vector === 1 || vector === 20)){
      console.log('Стоишь не смежно!');
      return false;
    } else return true
  }

  function attackTarget(event, target, attackType){
    if(attackType === 'strong') event.preventDefault();
    if(!checkingForAdjacency()) return
    switch(true){
      case (target === 'character'):
        for(let i = 0; i < enemyNumberOfAttack; i++){
          creatingLogString = 'Враг атакует персонажа ';
          attackAction('fast', enemyDiceNumber, enemyDamageMod, setCharacterHitPoints, characterHitPoints, characterArmorPoints, setCharacterArmorPoints, enemyAttackStat, characterDefStat, enemyEndurancePoints, setEnemyEndurancePoints)  
        }
      break;
      case (event.target.classList.contains('enemy') && characterHitPoints > 0):
        creatingLogString = attackType === 'strong' ? 'Персонаж использует Сильную Атаку ' : 'Персонаж использует Быструю Атаку ';
        setEndCharacterAttack(true);
        attackAction(attackType, characterDiceNumber, characterDamageMod, setEnemyHitPoints, enemyHitPoints, enemyArmorPoints, setEnemyArmorPoints, characterAttackStat, enemyDefStat, characterEndurancePoints, setCharacterEndurancePoints)
        props.setIsEndCharacterTurn(true)
      break;
    }
  }

  useEffect(()=>{
    if(!props.isEndCharacterTurn && enemyHitPoints > 0){
      attackTarget('', 'character', 'fast');
      setEndCharacterAttack(false)
      props.setIsEndCharacterTurn(false)
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
      <div className='battle-map' onClick={(e) => {attackTarget(e, '', 'fast')}} onContextMenu={(e) => {attackTarget(e, '', 'strong')}}>          
        <div className="battle-map__logs-wrapper">
          {arrayLogs}
        </div>
        <InformationBar 
          characterArmorPoints={characterArmorPoints}
          characterHitPoints={characterHitPoints}
          characterEndurancePoints={characterEndurancePoints}
          characterMovePoints={props.characterMovePoints}
        />
        {renderCells(280)}
      </div>
  );
}

export default BattleMap;
