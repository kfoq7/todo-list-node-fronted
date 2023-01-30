import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { axiosFetch } from '../axios'

const TaskPage = () => {
  const [tasks, setTasks] = useState([])

  const auth = useSelector(state => state.auth)

  const fetchTaskData = async () => {
    const response = await axiosFetch.get(`/user/${auth.user._id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    setTasks(response.data.tasks)
  }

  useEffect(() => {
    fetchTaskData()
  }, [])

  return (
    <>
      {!auth.authorization ? (
        <Navigate to="/" />
      ) : (
        <div>
          {tasks.map(task => (
            <div key={task._id}>
              <h2>{task.title}</h2>

              <p>{task.description}</p>
              <hr />
            </div>
          ))}

          <Link to="/add-task">Add a new task</Link>
        </div>
      )}
    </>
  )
}

export default TaskPage
