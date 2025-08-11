import {useState} from "react";
import {useEffect} from "react";
import MyContext from "./MyContext.jsx";

export default function TaskProvider({children}) {

  const [openSections, setOpenSections] = useState({
    taskForm: true,
    taskList: true,
    taskCompletedList: true
  })

  const [tasks, setTasks] = useState(() =>{
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [sortOrder, setSortOrder] = useState('asc')
  const [sortType, setSortType] = useState('date')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() =>{
    const timer = setInterval(() => {
      setTasks(tasks =>
        tasks.map((task) => {
          const overdue = new Date(task.taskDeadline) < new Date();
          return {
            ...task,
            overdue,
          }
        })
      )
    }, 1000 * 30)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleToggleSection = (section) => {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section]
    }))
  }

  function addTask(newTask) {
    setTasks(currentTasks => [...currentTasks, {...newTask, completed: false, id: Date.now(), overdue: false}])
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((currentTasks) => currentTasks.id !== id))
  }

  function completedTask(id) {
    setTasks(currentTasks => currentTasks.map(task => task.id === id ? {...task, completed: true} : task))
  }

  function toggleSort(type) {
    if (sortType === type){
      setSortOrder(sortOrder === 'asc' ? "desc" : 'asc')
    } else{
      setSortType(type)
      setSortOrder('asc')
    }
  }

  function sortTasks(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === 'priority') {
        const priorityOrder = {
          'High' : 1,
          'Medium' : 2,
          'Low' : 3,
        }

        return sortOrder === 'asc'
          ? priorityOrder[a.taskPriority] - priorityOrder[b.taskPriority]
          : priorityOrder[b.taskPriority] - priorityOrder[a.taskPriority]
      } else{
        return sortOrder === 'asc'
          ? new Date(a.taskDeadline) - new Date(b.taskDeadline)
          : new Date(b.taskDeadline) - new Date(a.taskDeadline)
      }
    })
  }

  const activeTask = sortTasks(tasks.filter((task) => !task.completed))
  const completedTasks = sortTasks(tasks.filter((task) => task.completed))

  return (
    <MyContext.Provider
      value={{
        openSections,
        activeTask,
        deleteTask,
        completedTasks,
        sortType,
        completedTask,
        toggleSort,
        addTask,
        handleToggleSection,
        sortOrder
      }}>
      {children}
    </MyContext.Provider>
  );
}

