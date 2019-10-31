import {observable,action} from "mobx";

class Todo extends React.Component {

    @observable value;
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
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
        this.props.dispatch(deletemyTodo(id));
    };

    render() {
        const value = this.state.value;
        const todos = this.props.todos;
        const visibleElements = todos.filter(item => item.isVisible);
        return (

            <React.Fragment>
                <h1>Todo App</h1>
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
                                                defaultChecked={item.isCheck}
                                                type='checkbox'
                                                onClick={this.handleCheckboxClick.bind(this, item.todoId)}/>
                                            {item.todoText}
                                        </label>
                                        <span className='delete-btn' role='button'
                                              onClick={this.handleDeletClick.bind(this, item.todoId)}>Delete</span>
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
                </div>
            </React.Fragment>
        )
    }
}

const todo  = new Todo();
export default todo;
