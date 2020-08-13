import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store/Task'

class AddTask extends Component {
    state = {
        text: "",
        imgSrc: ""
    }
    imgHandler = (event) => {

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            this.setState(state => ({
                ...state,
                imgSrc: [reader.result][0]
            }))
        }, false);
    }
    addTask = (event) => {
        event.preventDefault();
        this.props.addTask({ Text: this.state.text, ImgSrc: this.state.imgSrc });
        document.getElementById("img-input").value = "";
        this.setState({ text: "", imgSrc: "" });
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                <div className="form-group row">
                    <div className="col-lg-9">
                        <input
                            id="text-input"
                            name="text"
                            className="form-control"
                            placeholder="Text"
                            value={this.state.text}
                            required
                            onChange={(event) => this.setState({ text: event.target.value })} />
                    </div>
                </div>
                <div className="form-group row" >
                    <div className="col-lg-9">
                        <input
                            id="img-input"
                            name="img"
                            className="form-control"
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            required
                            onChange={this.imgHandler} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-9">
                        <button className="btn btn-default" type="submit">ADD</button></div>
                </div>
            </form>
        )
    }
}
const mapStateToProps = state => {
    return state.Task
}
const mapDispatcToProps = dispatch => {
    return {
        addTask: (task) => dispatch(actionCreators.addTask(task))
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(AddTask)
