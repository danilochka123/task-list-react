import TaskItem from "./TaskItem.jsx";

const TaskList = (props) => {
  const {
    tasks,
    deleteTask,
    completedTask
  } = props

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          {...task}
          key={task.taskDeadline}
          deleteTask={deleteTask}
          completedTask={completedTask}
        />
      ))}

    </ul>
  )
}

export default TaskList