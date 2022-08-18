import React from 'react';
import TodoList from './components/TodoList';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'


function UrlParams() {
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
    // url-params?status=new
    const location = useLocation();
    // const history = useHistory();
    // const match = useRouteMatch();
    const [todoList, setTodoList] = useState(inittodoList)
    const [filterStatus, setFilterStatus] = useState(() => {
        const params = queryString.parse(location.search)
        //console.log(params)
        return params.status || 'all'
    })

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
        //setFilterStatus('all')
        // const queryParams = { status: 'all' }
        // history.push({
        //     pathname: match.parh
        //     search: queryString.stringify(queryParams)
        // })
    }
    const handleShowCompleteClick = () => {
        // setFilterStatus('complete')
        // const queryParams = { status: 'complete' }
        // history.push({
        //     pathname: match.parh
        //     search: queryString.stringify(queryParams)
        // })
    }
    const handleShowNewClick = () => {
        // setFilterStatus('new')
        // const queryParams = { status: 'new' }
        // history.push({
        //     pathname: match.parh
        //     search: queryString.stringify(queryParams)
        // })
    }
    const renderTodoList = todoList.filter(todo => filterStatus === 'all' || filterStatus === todo.status)
    return (
        <div>
            <h3>Url Params</h3>
            <TodoList todoList={renderTodoList} onClickTodoList={handleTodoClick} />
            <div>
                <button onClick={handleShowAll}>Show all</button>
                <button onClick={handleShowCompleteClick}>Show complete</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    );

}
export default UrlParams;