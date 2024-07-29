import '../blocks/app/App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import BattleMap from './BattleMap';

function App() {

  const [isEndCharacterTurn, setIsEndCharacterTurn] = useState(false)
  const [characterMovePoints, setCharacterMovePoints] = useState(2);

  // useEffect(()=>{
  //   if(!isEndCharacterTurn) setCharacterMovePoints(2);
  // }, [isEndCharacterTurn])

  useEffect(()=>{
    // if(!isEndCharacterTurn) setCharacterMovePoints(2);
      console.log('Я здесь: ' + characterMovePoints)
      console.log('Я там: ' + isEndCharacterTurn)
  }, [isEndCharacterTurn, characterMovePoints])


  function throwD6Dice(numberOfDice){
    let summOfDice = 0;
    for (let i = 0; i < numberOfDice; i++){
      summOfDice += Math.floor(Math.random() * 6 + 1);
    }
    return summOfDice;
  }

  return (
    <div className="App">
      <BattleMap 
        throwD6Dice={throwD6Dice}
        characterMovePoints={characterMovePoints}
        setCharacterMovePoints={setCharacterMovePoints}
        isEndCharacterTurn={isEndCharacterTurn}
        setIsEndCharacterTurn={setIsEndCharacterTurn}/>
    </div>
  );
}

export default App;
