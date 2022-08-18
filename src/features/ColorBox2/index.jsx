import React from 'react'
import { useState } from 'react';


export default function ColorBox2() {
    const [color, setColor] = useState('white');
    return (
        <div>
            {color}
            <button onClick={() => setColor('black')}>Change to black</button>
            <button onClick={() => setColor('white')}>Change to white</button>
        </div>
    )
}
