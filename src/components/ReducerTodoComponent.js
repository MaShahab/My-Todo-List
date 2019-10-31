import React, {Component} from 'react'

export default class ReducerTodo extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }

    todoreducer = (state = [], action) => {

        const ADD_TODO = 'ADD_TODO';
        const TOGGLE_TODO = 'TOGGLE_TODO';
        const SHOW_ALL = 'SHOW_ALL';
        const SHOW_ONGOING = 'SHOW_ONGOING';
        const SHOW_COMPLETED = 'SHOW_COMPLETED';
        const DELETE_TODO = 'DELETE_TODO';

        switch (action.type) {
            case ADD_TODO:
                const allItems = [
                    ...state, {
                        todoText: action.todoText,
                        isCheck: action.isCheck,
                        myTime : new Date(),
                        todoId: action.todoId,
                        isVisible: action.isVisible
                    }
                ];
                const makeItVisible = allItems.map(item => {
                    return {...item, isVisible: true}
                });
                return makeItVisible
            case TOGGLE_TODO:
                return (
                    state.map((item) => {
                        return (
                            (item.todoId === action.todoId)
                                ?
                                {...item, isCheck: !item.isCheck}
                                :
                                item
                        )
                    }));
            case SHOW_ONGOING:
                const activeList = state.map((item) => {
                    return (
                        (item.isCheck)
                            ?
                            {...item, isVisible: false}
                            :
                            {...item, isVisible: true}
                    )
                });
                return activeList;
            case SHOW_COMPLETED:
                const completedList = state.map((item) => {
                    return (
                        (!item.isCheck)
                            ?
                            {...item, isVisible: false}
                            :
                            {...item, isVisible: true}
                    )
                });
                return completedList;

            case SHOW_ALL:
                const totalList = state.map((item) => {
                    return (
                        {...item, isVisible: true}
                    )
                })
                return totalList;

            case DELETE_TODO:
                return state.filter(item => item.todoId !== action.todoId);
            // return wholeList
            default:
                return state
        }
    };
}