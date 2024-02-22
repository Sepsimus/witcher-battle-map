import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Character from './Character';

function BattleMap() {

    function renderCells(numberOfCells){
      let array = [];
      for(let i = 0; i < numberOfCells; i++){
        if(i === numberOfCells-1){
            array.push(<Cell key={`cell_${i}`} isLast={true} />)  
        }else array.push(<Cell key={`cell_${i}`}/>);
    }
      return array;
    }

    return (
        <div className='battle-map'>
          {renderCells(100)}
        </div>
    );
}

export default BattleMap;
