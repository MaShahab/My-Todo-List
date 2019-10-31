import React,{Component} from 'react'

export default class DeleteTodo extends Component{
    render() {
        return (
            <div>

            </div>
        );
    }
    deleteTodo = (id) => {
        const DELETE_TODO = 'DELETE_TODO';
        return {
            type: DELETE_TODO,
            todoId: id
        }
    };

    deleteAllCompleted = () => {
        const DELETE_TODO = 'DELETE_COMPLETED_TODO';
        return {
            type: DELETE_TODO,
            todoId: []
        }
    };
}