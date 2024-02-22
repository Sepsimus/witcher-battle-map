import React, { useEffect, useState } from 'react';
import Character from './Character';

function Cell(props) {

    const [dragZoneLight, setDragZoneLight] = React.useState(false);
    const [pickCharacter, setPickCharacter] = React.useState(false);

    function handleDragStart(event){
        const isCharacter = event.target.classList.contains('character');
        if(isCharacter){
            event.dataTransfer.setData("Text", '.character');
        }
    }

    function handleDragOver(event){
        event.preventDefault();
        setDragZoneLight(true);
    }

    function handleDragLeave(event){
        setDragZoneLight(false);
    }
    
    function handleDrop(event){
        setDragZoneLight(false);
        const characterClass = event.dataTransfer.getData("Text");
        const isCharacter = event.target.classList.contains('character');
        console.log(characterClass !== '.character');
        if(isCharacter){
            // console.log('В этой клетке персонаж уже стоит!')
            return
        }
        if(characterClass !== '.character'){
            // console.log('Надо тянуть за персонажа, а не за пустую клетку!')
            return
        }
        // console.log('В этой клетке нет персонажа и я выбрал персонажа')
        event.target.appendChild(document.querySelector(characterClass));   
        setPickCharacter(false);
    }

    return (
        <div className={`cell ${dragZoneLight ? 'cell_light' : 'cell_dark'}`} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            {props.isLast ? <Character /> : <></>}
        </div>
    );
}

export default Cell;
