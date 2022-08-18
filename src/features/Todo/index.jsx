import React from 'react';
import TodoList from './components/TodoList';
import { useState } from 'react';

function TodoFeature() {
    const inittodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new'
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'complete'

        },
        {
            id: 3,
            title: 'Code',
            status: 'new'

        }
    ]
    const [todoList, setTodoList] = useState(inittodoList)
    const [filterStatus, setFilterStatus] = useState('all')

    const handleTodoClick = (todo, index) => {
        //clone current array to the new array
        const newTodoList = [...todoList]
        // toggle state
        // const newTodoList[index] = {
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'new' ? 'complete' : 'new'
        }
        // newTodoList[index] = newTodo;
        setTodoList(newTodoList);
    }
    const handleShowAll = () => {
        setFilterStatus('all')
    }
    const handleShowCompleteClick = () => {
        setFilterStatus('complete')
    }
    const handleShowNewClick = () => {
        setFilterStatus('new')
    }
    const renderTodoList = todoList.filter(todo => filterStatus === 'all' || filterStatus === todo.status)
    return (
        <div>
            <h3>Todo List</h3>
            <TodoList todoList={renderTodoList} onClickTodoList={handleTodoClick} />
            <div>
                <button onClick={handleShowAll}>Show all</button>
                <button onClick={handleShowCompleteClick}>Show complete</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    );

}
export default TodoFeature;