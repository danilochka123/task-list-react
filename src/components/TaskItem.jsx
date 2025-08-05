import classNames from "classnames";

const TaskItem = (props) => {
  const {
    taskTitle,
    taskDeadline,
    taskPriority,
    id,
    completed,
    deleteTask,
    completedTask
  } = props

  return (
    <li className={classNames("task-item",{
      'low' : taskPriority === 'Low',
      'medium' : taskPriority === 'Medium',
      'high' : taskPriority === 'High',
      'completed' : completed === true
    })}>
      <div className="task-info">
        <div>
          {taskTitle} - <strong>{taskPriority}</strong>
        </div>
        <div className="task-deadline">Due: {new Date(taskDeadline).toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        <button className="complete-button" onClick={() => completedTask(id)}>
          Complete
        </button>
        {!completed && (
          <button className="delete-button" onClick={() => deleteTask(id)}>
            Delete
          </button>
        )}
      </div>
    </li>
  )
}

export default TaskItem