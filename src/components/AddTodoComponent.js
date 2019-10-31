import React,{Component} from 'react'

export default class AddTodo extends Component{
    render() {
        return (
            <div>

            </div>
        );
    }
    addTodo = (value) => {
        const ADD_TODO = 'ADD_TODO';
        return {
            type: ADD_TODO,
            todoText: value,
            myTime : new Date(),
            isCheck: false,
            todoId: Date.now(),
            isVisible: true
        }
    };
}