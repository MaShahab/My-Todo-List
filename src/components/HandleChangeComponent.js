import React,{Component} from 'react'
import {observable,action} from "mobx";

class HandleChange extends Component{
    @observable myhandle;
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <div>

            </div>
        );
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            value
        })
    };
}

export default HandleChange;