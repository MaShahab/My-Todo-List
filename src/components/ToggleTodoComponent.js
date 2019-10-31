import React,{Component} from 'react'

export default class ToggleTodo extends Component{
    render() {
        return (
            <div>

            </div>
        );
    }

    toggleTodo = (id) => {
        const TOGGLE_TODO = 'TOGGLE_TODO';
        return {
            type: TOGGLE_TODO,
            todoId: id
        }
    };
}