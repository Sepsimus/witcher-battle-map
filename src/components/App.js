import '../blocks/app/App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import BattleMap from './BattleMap';
import CharacterConfig from '../configuration/CharacterConfig';
import TurnCounter from './TurnCounter';

function App() {

  const [isEndCharacterTurn, setIsEndCharacterTurn] = useState(false)
  const [characterMovePoints, setCharacterMovePoints] = useState(CharacterConfig.movementPoints || 2);
  const [turnNumber, setTurnNumber] = useState(0);
  
  useEffect(()=>{
    if(!isEndCharacterTurn){
      setTurnNumber(turnNumber+1);
      console.log("Ход №"+turnNumber)
    }
  }, [isEndCharacterTurn])

  function throwD6Dice(numberOfDice){
    let summOfDice = 0;
    for (let i = 0; i < numberOfDice; i++){
      summOfDice += Math.floor(Math.random() * 6 + 1);
    }
    return summOfDice;
  }

  function throwD10Dice(numberOfDice){
    let summOfDice = 0;
    for (let i = 0; i < numberOfDice; i++){
      summOfDice += Math.floor(Math.random() * 10 + 1);
    }
    return summOfDice;
  }

  return (
    <div className="App">
      <TurnCounter 
        turnNumber={turnNumber}
      />
      <BattleMap 
        throwD6Dice={throwD6Dice}
        throwD10Dice={throwD10Dice}
        characterMovePoints={characterMovePoints}
        setCharacterMovePoints={setCharacterMovePoints}
        isEndCharacterTurn={isEndCharacterTurn}
        setIsEndCharacterTurn={setIsEndCharacterTurn}
      />
    </div>
  );
}

export default App;
