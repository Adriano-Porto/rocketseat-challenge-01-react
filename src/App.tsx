import { CheckCircle, Circle, Notebook, PlusCircle, Trash } from "phosphor-react"
import { ChangeEvent, FormEvent, useState } from "react"
import styles from './app.module.css'
import logo from './assets/todo-logo.svg'

interface Task {
  id: number
  title: string
  completed: boolean
}

export function App() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [increment, setIncrement] = useState(0)

  const [newTask, setNewTask] = useState('')

  const concludedTasks = tasks.filter(task => task.completed).length;

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    if (!newTask) {
      return
    }

    const createdTask: Task = {
      id: increment,
      title: newTask,
      completed: false
    }

    setTasks((state) => [...state, createdTask])

    setNewTask('')

    setIncrement((state) => (state + 1))
  }

  function handleDeleteTask(id: number) {
      const filteredTasks = tasks.filter(task => task.id !== id)

      setTasks(filteredTasks)
  }

  function toggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task
    })

    setTasks(updatedTasks)
  }


  return (
    <div>
      <header className={styles.header}>
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </header>

      <form className={styles.addTask}>
        <input
          type="text"
          value = {newTask}
          onChange={handleNewTaskChange}
          placeholder="Adicione uma nova tarefa"
        />
        <button onClick = {handleCreateTask}>
          Criar
          <PlusCircle type = "submit" size={16} /> 
        </button>
      </form>

      <div className={styles.tasks}>
        <header>
          <div className={styles.created}>
            <p>Tarefas Criadas</p>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.concluded}>
            <p>Concluídas</p>
            <span>{concludedTasks}</span>
          </div>
        </header>
        
        <div className={styles.taskList}>
          {
            tasks.length === 0 ? (
              <div className={styles.noTasks}>
                <Notebook size={56} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            ) : (
              tasks.map(task => {
                const { completed } = task	
                  return (
                    <div key={task.id} className={ completed ? styles.taskCompleted : styles.taskUncompleted }>
                      <button onClick={() => toggleTaskCompletion(task.id)}>
                      { completed ?
                        (<CheckCircle size={24} />) :
                        (<Circle size={24} />)
                        }
                        
                      </button>

                      <span>{task.title}</span>
                      <button onClick={() => handleDeleteTask(task.id)}>
                        <Trash size = {18}/>
                      </button>
                    </div>
                  )
                }
              )
            )
          }
        </div>
      </div>

    </div>
  )
}
