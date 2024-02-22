import React, { useEffect, useState } from 'react';
import Character from './Character';

function Cell(props) {

    const [dragZoneLight, setDragZoneLight] = React.useState(false);

    function handleDragOver(event){
        event.preventDefault();
        setDragZoneLight(true);
    }

    function handleDragLeave(event){
        setDragZoneLight(false);
    }
    
    function handleDrop(event){
        setDragZoneLight(false);
        // console.log('dropped!')
        
        // const previousCharacter = document.querySelector('.character');
        // console.log(previousCharacter);
        // if(previousCharacter.parentNode){
        //     console.log(previousCharacter.parentNode)
        //     previousCharacter.parentNode.removeChild(previousCharacter);
        //     // setCreateCharacter(true);
        // }
        
        // const newPosition = event.dataTransfer.getData('Text');

        const character = document.querySelector(`.character`);
        const isCharacter = event.target.classList.contains('character');
        if(isCharacter){
            return
        }
        character.parentNode.removeAttribute('value')
        event.target.appendChild(character);
        event.target.setAttribute('value', 'true');
        return    
        
    }

    return (
        <div className={`cell ${dragZoneLight ? 'cell_light' : 'cell_dark'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            {props.isLast ? <Character /> : <></>}
        </div>
    );
}

export default Cell;
