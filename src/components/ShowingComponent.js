import React,{Component} from 'react'

export default class Showing extends Component{

    render() {
        return (
            <div>

            </div>
        );
    }
    showAll = () => {
        const SHOW_ALL = 'SHOW_ALL';
        return {
            type: SHOW_ALL
        }
    };
    showOngoing = () => {
        const SHOW_ONGOING = 'SHOW_ONGOING';
        return {
            type: SHOW_ONGOING
        }
    };
    showCompleted = () => {
        const SHOW_COMPLETED = 'SHOW_COMPLETED';
        return {
            type: SHOW_COMPLETED
        }
    };
}