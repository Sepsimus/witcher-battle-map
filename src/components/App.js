import '../blocks/app/App.css';
import { useEffect } from 'react';
import BattleMap from './BattleMap';

function App() {

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
        throwD6Dice={throwD6Dice}/>
    </div>
  );
}

export default App;
