import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Character from './Character';

function BattleMap(props) {

    const [characterPosition, setCharacterPosition] = useState(150)
    const [enemyPosition, setEnemyPosition] = useState(15)

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
                isEndCharacterTurn={props.isEndCharacterTurn}/>)
    }
      return array;
    }

    return (
        <div className='battle-map'>
          {renderCells(280)}
        </div>
    );
}

export default BattleMap;
