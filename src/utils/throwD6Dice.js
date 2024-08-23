function throwD6Dice(numberOfDice){
    let summOfDice = 0;
    for (let i = 0; i < numberOfDice; i++){
      summOfDice += Math.floor(Math.random() * 6 + 1);
    }
    return summOfDice;
  }

export default throwD6Dice;