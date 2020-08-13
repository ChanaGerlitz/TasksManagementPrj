import React from 'react'
import TaskItem from './TaskItem'
const ShowTasksList = (props) => {
    return (
        <ul className="list-group border">
            {
                props.tasks.length > 0 ? props.tasks.map((singleTask, i) => {
                    return <TaskItem task={singleTask} key={i} />
                }) : null
            }
        </ul>
    )
}
export default ShowTasksList
