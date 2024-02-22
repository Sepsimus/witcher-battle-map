import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

function Character() {

    function choseEnemy(){

    }

    return (
        <div className={`character`} draggable onClick={choseEnemy}/>
    );
}

export default Character;
