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
        {!completed && (
<<<<<<< HEAD
          <button className="complete-button" onClick={() => completedTask(id)}>
            Complete
          </button>
=======
        <button className="complete-button" onClick={() => completedTask(id)}>
          Complete
        </button>
>>>>>>> 75c259813cf1fa25fc70618ae195d8f620c640d6
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
