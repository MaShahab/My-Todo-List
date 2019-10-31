import React, {Component} from 'react';
import '../App.css';
import "../Styles/MainCSS.css"
import * as ReactRedux from "react-redux";
import * as Redux from 'redux'
import ReactDOM from 'react-dom';
import AddTodo from "../components/AddTodoComponent";
import ToggleTodo from "../components/ToggleTodoComponent";
import Showing from "../components/ShowingComponent";
import DeleteTodo from "../components/DeleteTodoComponent";
import ReducerTodo from "../components/ReducerTodoComponent";
import {observer} from "mobx-react";
import loadingProgress from "../images/amc_loading.gif"
import DeleteIcon from "../images/x-button.png"
import myStore from "../store";

@observer
class Main extends Component {
    render() {

        const {Component} = React;
        const {Provider} = ReactRedux;
        const {createStore, combineReducers} = Redux;

        const ADD_TODO = 'ADD_TODO';
        const TOGGLE_TODO = 'TOGGLE_TODO';
        const SHOW_ALL = 'SHOW_ALL';
        const SHOW_ONGOING = 'SHOW_ONGOING';
        const SHOW_COMPLETED = 'SHOW_COMPLETED';
        const DELETE_TODO = 'DELETE_TODO';

        let addtodo = new AddTodo();
        let myAddTodo = addtodo.addTodo;


        let toggletodo = new ToggleTodo();
        let myToggleTodo = toggletodo.toggleTodo;

        let showingTodo = new Showing();
        let showALL = showingTodo.showAll;
        let showOngoing = showingTodo.showOngoing;
        let showCompleted = showingTodo.showCompleted;

        let deleteTodos = new DeleteTodo();
        let deletemyTodo = deleteTodos.deleteTodo;

        let deleteCompleted = new DeleteTodo();
        let deleteMyCompleted = deleteCompleted.deleteAllCompleted;

        let todoReducer = new ReducerTodo();
        let newtodoReducer = todoReducer.todoreducer;
        const todoreducer = (state = [], action) => {
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
                    return state.filter(item => item.todoId !== action.todoId)
                // return wholeList
                default:
                    return state
            }
        };

        const allReducers = combineReducers({todoreducer});

        @observer
        class Todo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: ''
                };
                this.ownTime = new Date();
            }

            handleChange = (e) => {
                const value = e.target.value;
                this.setState({
                    value
                })
            };

            handleKeyUp = (value, e) => {
                if (e.key === 'Enter') {
                    this.state.value.trim().length &&
                    this.props.dispatch(myAddTodo(value));

                    this.setState({
                        value: ''
                    })
                }
            };

            handleSubmit = (value) => {
                this.state.value.trim().length &&
                this.props.dispatch(myAddTodo(value));

                this.setState({
                    value: ''
                })
            };

            handleClearIcon = () => {
                this.setState({
                    value: ''
                })
            };


            handleCheckboxClick = (id) => {
                this.props.dispatch(myToggleTodo(id));
            };

            showOngoing = () => {
                this.props.dispatch(showOngoing());
            };

            showCompleted = () => {
                this.props.dispatch(showCompleted());
            };

            showAll = () => {
                this.props.dispatch(showALL());
            };

            handleDeletClick = (id) => {
                console.log("delete");
                var answer = window.confirm("Are you sure you want to remove this item ?");
                if (answer) {
                    this.props.dispatch(deletemyTodo(id));
                }
                else {
                    return
                }
            };

            deleteCompletedItems = () => {

                // this.props.dispatch(deletemyTodo());

                var answer = window.confirm("Are you sure you want to delete all completed Todos?");
                if (answer) {
                    var element = document.getElementsByClassName("line-through");
                    while(element.length > 0){
                        element[0].parentNode.remove(element[0]);
                    }
                }
                else {
                    return
                }
            };

            render() {
                const value = this.state.value;
                const todos = this.props.todos;
                const visibleElements = todos.filter(item => item.isVisible);

                let p = new Promise((resolve , reject) =>{
                    setTimeout(() =>{
                        resolve()
                    },1000)
                });

                p.then( ()=>{
                    console.log("salam");
                    let a = document.getElementById("loading_division");
                    // a.style.cssText = "transition: all 2s; display: none";
                    a.style.transition="opacity 1s";
                    a.style.opacity="0";

                    let b = document.getElementById("loading_division");
                    b.style.zIndex="-1";
                });

                return (
                    <React.Fragment>


                        <h1></h1>
                        <div id="loading_division">
                            <img src={loadingProgress} id="loading" alt="sdfds"/>
                        </div>


                        <h1>Todo List</h1>
                        <div className="todo-container">
                            <div className='inputFields'>
                                <input
                                    className='inputs'
                                    type='text'
                                    value={value}
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleKeyUp.bind(this, value)}/>
                                <span
                                    className={`input-clear-icon ${value !== '' ? 'clear-icon--show' : ''} `}
                                    onClick={this.handleClearIcon}> X
            </span>
                            </div>
                            <button
                                className='btn'
                                type='button'
                                onClick={this.handleSubmit.bind(this, value)}>Submit
                            </button>
                        </div>

                        {

                            visibleElements.length > 0 &&
                            <ul className='list'>
                                {
                                    todos.map((item, index) => {
                                        return (

                                            item.isVisible &&
                                            <li
                                                className='list-item'
                                                key={item.todoId}>
                                                <label
                                                    className={`list-label ${item.isCheck ? 'line-through' : ''}`}>

                                                    <input
                                                        id="itemCheckbox"
                                                        defaultChecked={item.isCheck}
                                                        type='checkbox'
                                                        onClick={this.handleCheckboxClick.bind(this, item.todoId)}/>
                                                    <span id="todoText">{item.todoText}</span>
                                                    <span id="time">{item.myTime.toLocaleTimeString()}</span>
                                                </label>

                                                {/*<button onClick={()=>myStore.stopTime()}>pause</button>*/}
                                                {/*<button>resume</button>*/}

                                                <span className='delete-btn' role='button'
                                                      onClick={this.handleDeletClick.bind(this, item.todoId)}><img className="delete_icon" src={DeleteIcon}/> </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                        {
                            todos.length === 0 ? <p>TODO list is empty</p> : (visibleElements.length === 0 ?
                                <p>No results found for this filter</p> : '')
                        }
                        <div className='filter-container'>Filters:
                            <input type='radio' name='filter' id='allFilter' className='filter-input'
                                   onClick={this.showAll} disabled={todos.length === 0}/><label for='allFilter'
                                                                                                className='filter-label'>All</label>

                            <input type='radio' name='filter' id='activeFilter' className='filter-input'
                                   onClick={this.showOngoing} disabled={todos.length === 0}/><label for='activeFilter'
                                                                                                    className='filter-label'>Active</label>

                            <input type='radio' name='filter' id='completedFilter' className='filter-input'
                                   onClick={this.showCompleted} disabled={todos.length === 0}/><label
                                for='completedFilter' className='filter-label'>Completed</label>

                            <input type='radio' name='filter' id='removeCompleted' className='filter-input'
                                   onClick={this.deleteCompletedItems} disabled={todos.length === 0}/><label
                                for='removeCompleted' className='filter-label'>Remove Completed</label>
                        </div>
                    </React.Fragment>
                )
            }
            newDate = () =>{
                let dateList = [];
                let i = new Date();
                dateList.push(i.toLocaleTimeString());
                console.log(dateList)
                // document.write(dateList[0])
            };
        }

        const mapStateToProps = (state) => {
            return {
                todos: state.todoreducer
            }
        };

        const TodoApp = ReactRedux.connect(mapStateToProps)(Todo);
        const store = createStore(allReducers);

        ReactDOM.render(
            <Provider store={store}>
                <TodoApp/>
            </Provider>,
            document.getElementById('root')
        );


        return (
            <div id="main_division">
                <div className="container">
                    <div id="root">
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
