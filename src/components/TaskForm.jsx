import {useState} from "react";

const TaskForm = (props) => {
  const {
    addTask
  } = props

  const [taskTitle, setTaskTitle] = useState('')
  const [taskPriority, setTaskPriority] = useState('Low')
  const [taskDeadline, setTaskDeadline] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if(taskTitle.trim() && taskDeadline){
      addTask({taskTitle, taskPriority, taskDeadline})
      setTaskTitle('')
      setTaskPriority('Low')
      setTaskDeadline('')
    }

  }

  return (
    <>
      <form
        action=""
        className='task-form'
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          required
          placeholder="Task title"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(event) => setTaskPriority(event.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="datetime-local"
          required
          value={taskDeadline}
          onChange={(event) => setTaskDeadline(event.target.value)}
        />
        <button type="submit">Add task</button>
      </form>
    </>
  )
}

export default TaskForm
