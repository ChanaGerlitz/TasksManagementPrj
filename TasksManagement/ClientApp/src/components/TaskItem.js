import React from 'react';

export default ({ task }) => {
    return (
        <li className="list-group-item row">
            <div className="col-lg-8">
                <span className="border border-success">
                    <h5>{task.Text}</h5>
                </span>
            </div>
            <div className="col-lg-4">
                <img className="taskImg" src={task.ImgSrc}>
                </img>
            </div>
        </li>
    )
}