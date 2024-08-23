function throwD10Dice(numberOfDice){
  let summOfDice = 0;
  for (let i = 0; i < numberOfDice; i++){
    summOfDice += Math.floor(Math.random() * 10 + 1);
  }
  return summOfDice;
}

export default throwD10Dice;