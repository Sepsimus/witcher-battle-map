import CharacterConfig from '../configuration/CharacterConfig';
import WeaponConfig from '../configuration/WeaponConfig';
import ArmorConfig from '../configuration/ArmorConfig';

function InformationBar(props) {

    return (
      <div className="information-bar">
        <div className='information-bar__wrapper'>
            HP:
            <div className='information-bar__strip'>
                <div className='information-bar__progress' style={{backgroundColor: "#E9573F", width: `${props.characterHitPoints / CharacterConfig.hitPoints * 100}%`}}></div>
                <p className='information-bar__txt'>{props.characterHitPoints}/{CharacterConfig.hitPoints}</p>
            </div>
        </div>
        <div className='information-bar__wrapper'>
            EP:
            <div className='information-bar__strip'>
                <div className='information-bar__progress' style={{backgroundColor: "#0018F9", width: `${props.characterEndurancePoints / CharacterConfig.endurancePoints * 100}%`}}></div>
                <p className='information-bar__txt'>{props.characterEndurancePoints}/{CharacterConfig.endurancePoints}</p>
            </div>
        </div>
        <div className='information-bar__wrapper'>
            MP:
            <div className='information-bar__strip'>
                <div className='information-bar__progress' style={{backgroundColor: "#8CC152", width: `${props.characterMovePoints / CharacterConfig.movementPoints * 100}%`}}></div>
                <p className='information-bar__txt'>{props.characterMovePoints}/{CharacterConfig.movementPoints}</p>
            </div>
        </div>
        <div className='information-bar__wrapper'>
            DM:
            <div className='information-bar__strip'>
                <div className='information-bar__progress'></div>
                <p className='information-bar__txt'>{WeaponConfig[CharacterConfig.weapon].numberOfDice}d6{WeaponConfig[CharacterConfig.weapon].damageMod > 0 && '+'+WeaponConfig[CharacterConfig.weapon].damageMod}</p>
            </div>
        </div>
        <div className='information-bar__wrapper'>
            AP:
            <div className='information-bar__strip'>
                <div className='information-bar__progress' style={{backgroundColor: "#C5C9C7", width: `${props.characterArmorPoints / ArmorConfig[CharacterConfig.armor].armorPoints * 100}%`}}></div>
                <p className='information-bar__txt'>{props.characterArmorPoints}/{ArmorConfig[CharacterConfig.armor].armorPoints}</p>
            </div>
        </div>
      </div>
    );
  }
  
  export default InformationBar;
  