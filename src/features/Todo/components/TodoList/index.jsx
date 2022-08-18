import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss'

TodoList.propTypes = {
    todoList: PropTypes.array,
    onClickTodoList: PropTypes.func
};
TodoList.defaultProps = {
    todoList: [],
    onClickTodoList: null
}
function TodoList(props) {
    const { todoList, onClickTodoList } = props;
    const handleClickTodoItem = (todo, index) => {
        onClickTodoList(todo, index)
    }
    return (
        <ul>
            {todoList.map((todo, index) => (
                <li
                    className={classnames({
                        'active': todo.status === 'complete',
                        'todo-item': true
                    })}
                    key={todo.id}
                    onClick={() => handleClickTodoItem(todo, index)}
                >
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;