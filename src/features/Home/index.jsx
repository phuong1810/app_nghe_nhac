import React from 'react'
import ColorBox from '../../components/ColorBox'
import TodoFeature from '../Todo';
import ColorBox2 from '../ColorBox2'

export default function Home() {
    const name = 'Phuong'
    const age = 18;
    const isFemale = true;
    const student = {
        name: 'Frontend'
    };
    const colorList = ['red', 'blue', 'green']
    return (
        <div>
            <ColorBox color="red" />
            <h3>Render chuoi: {name}</h3>
            <h3>Render so: {age}</h3>
            <h2 style={{ color: 'green' }}>Render boolean</h2>
            <h3>Render boolean: {isFemale ? 'Female' : 'Male'}</h3>
            <h3>Render boolean: {isFemale ? <p>Female</p> : <p>Male</p>}</h3>
            {isFemale && <p>Female</p>}
            {!isFemale && <p>Male</p>}
            {
                isFemale && (
                    <div>
                        <p>Female 1</p>
                        <p>Female 2</p>
                        <p>Female 3</p>
                    </div>
                )
            }
            {isFemale && (
                <React.Fragment>
                    <p>Female 1</p>
                    <p>Female 2</p>
                    <p>Female 3</p>
                </React.Fragment>
            )}
            {isFemale && (
                <>
                    <p>Female 1</p>
                    <p>Female 2</p>
                    <p>Female 3</p>
                </>
            )}
            <h3>Render Object: {student.name}</h3>
            <h3>Render array: {age}</h3>
            <ul>
                {colorList.map((color, index) => (
                    <li key={index} style={{ color }}>{color}</li>
                ))}
            </ul>
            <TodoFeature />

            <ColorBox2 />
        </div>
    )
}
