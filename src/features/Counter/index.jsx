import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

function CounterFeature(props) {
    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter)
    
    const handleIncreaseClick = () =>{
        const action = increase(123);
        //console.log(action);
        dispatch(action)
    }
    
    const handleDecreaseClick = () =>{
        const action= decrease()
        //console.log(action);
        dispatch(action)
    }

    return (
        <div>
            Counter {counter} 
            <button onClick={handleIncreaseClick}>Increase</button>
            <button onClick={handleDecreaseClick}>Decrease</button>
        </div>
    );
}

export default CounterFeature;