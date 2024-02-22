import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

function Character() {

    return (
        <div className={`character`} draggable />
    );
}

export default Character;
