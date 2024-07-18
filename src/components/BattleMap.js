import React, { useLayoutEffect, useState } from 'react';
import Cell from './Cell';
import Character from './Character';

function BattleMap(props) {

  const [characterPosition, setCharacterPosition] = useState(150)
  const [enemyPosition, setEnemyPosition] = useState(130)
  const [characterHitPoints, setCharacterHitPoints] = useState(35);
  const [enemyHitPoints, setEnemyHitPoints] = useState(35);

  useLayoutEffect(()=>{
    checkHitPointStatus(characterHitPoints)
  }, [characterHitPoints])

  useLayoutEffect(()=>{
    checkHitPointStatus(enemyHitPoints)
  }, [enemyHitPoints])

  function checkHitPointStatus(hitPoint){ 
    switch (true){
      case hitPoint === 35: 
          console.log('Здоров!')
          console.log(`Здоровье: ${hitPoint}`);
          break;
      case hitPoint < 35 && hitPoint > 25:
          console.log('Получил повреждения!')
          console.log(`Здоровье: ${hitPoint}`);
          break;
      case hitPoint < 25 && hitPoint > 5:
          console.log('Серьезные повреждения!')
          console.log(`Здоровье: ${hitPoint}`);
          break;
      case hitPoint < 5 && hitPoint > 0:
          console.log('Код красный!')
          console.log(`Здоровье: ${hitPoint}`);
          break;
      case hitPoint <= 0:
          console.log('Пульса нет...')
          console.log(`Здоровье: ${hitPoint}`);
          break;
  }
  }

  function showHitPoints(tooltip, className){
    setTimeout(() => {
        tooltip.current.classList.remove(`${className}__tooltip_hidden`)
    }, 300)
  }

  function hideHitPoints(tooltip, className){
      tooltip.current.classList.add(`${className}__tooltip_hidden`)
  }

  function attackAction(numberOfDice, setNewHitPoints, currentHitPoints){
      console.log('Атака!')
      let vector = Math.abs(characterPosition - enemyPosition);
      switch(vector){
          case 1: 
          case 20:
              setNewHitPoints(currentHitPoints - props.throwD6Dice(numberOfDice))
          break;
      }
  }

  function attackTarget(event, target){
    switch(true){
      case (target === 'character'):
        console.log('Attack character')
        attackAction(2, setCharacterHitPoints, characterHitPoints)
      break;
      case (event.target.classList.contains('enemy')):
        console.log('Attack enemy')
        attackAction(3, setEnemyHitPoints, enemyHitPoints)
        props.setIsEndCharacterTurn(true)
      break;
    }
  }

  useLayoutEffect(()=>{
    if(props.isEndCharacterTurn)
      attackTarget('', 'character')
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
