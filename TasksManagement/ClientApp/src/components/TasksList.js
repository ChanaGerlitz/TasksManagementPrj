import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShowTasksList from './ShowTasksList'
import { actionCreators } from '../store/Task'
class TasksList extends Component {
    componentDidMount() {
        this.props.getUserTasks();
    }
    render() {
        return (
            <div>
                <div className="showTasksList">
                    {this.props.tasks.length > 0 ?
                        <ShowTasksList tasks={this.props.tasks} />
                        : null}
                </div>
                <div className="hr"></div>
                <div className="showTasksList">
                    {this.props.allTasks.length > 0 ?
                        <ShowTasksList tasks={this.props.allTasks} /> : null}
                </div>
                <div >
                    <button className="btn btn-default btnLoadAll" type="button" onClick={this.props.getAllTasks}>LOAD ALL</button>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllTasks: () => dispatch(actionCreators.getAllTasks()),
        getUserTasks: () => dispatch(actionCreators.getUserTasks())
    }
}
const mapStateToProps = state => {
    return state.Task
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksList)
