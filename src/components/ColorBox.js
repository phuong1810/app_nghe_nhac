import React from 'react'

export default function ColorBox(props) {
    const { color } = props;
    return (
        <div className="box" style={{ background: color }}></div>
    )
}
