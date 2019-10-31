import React,{Component} from 'react'
import ReactDOM from "react-dom";
import Provider from "react-redux/lib/components/Provider";
import * as ReactRedux from "react-redux";
import {createStore} from "redux";

export default class Provide extends Component{
    mapStateToProps;
    Todo;
    allReducers;
    render() {
        const TodoApp = ReactRedux.connect(this.mapStateToProps)(this.Todo);
        const store = createStore(this.allReducers);
        ReactDOM.render(
            <Provider store={store}>
                <TodoApp/>
            </Provider>,
            document.getElementById('root')
        );
        return (
            <div>

            </div>
        );
    }
}