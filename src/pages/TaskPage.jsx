import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
import {
  deleteTask,
  fetchUserTasks,
  updateStatusTask
} from '../redux/slices/taskSlice'

const TaskPage = () => {
  // const [tasks, setTasks] = useState([])
  const [check, setCheck] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const task = useSelector(state => state.task)
  const { user, token, authorization } = useSelector(state => state.auth)

  // console.log(task)
  // const fetchTaskData = async () => {
  //   const response = await axiosFetch.get(`/user/${auth.user._id}`, {
  //     headers: {
  //       Authorization: `Bearer ${auth.token}`
  //     }
  //   })

  //   setTasks(response.data.tasks)
  // }

  const handleChangeTaskStatus = taskId => {
    setCheck(!check)

    const status = check ? 'COMPLETED' : 'PENDING'

    dispatch(
      updateStatusTask({ userId: user._id, taskId, status, token: token })
    )
  }

  const handleDeleteTask = taskId => {
    // axiosFetch.delete(`/user/delete-task/${auth.user._id}/${taskId}`, {
    //   headers: {
    //     Authorization: `Bearer ${auth.token}`
    //   }
    // })
    dispatch(deleteTask({ userId: user._id, taskId, token: token }))
  }

  const handleEditTask = taskId => {
    navigate('/edit-task')
  }

  useEffect(() => {
    dispatch(fetchUserTasks({ userId: user._id, token: token }))
    // fetchTaskData()
  }, [])

  return (
    <>
      {!authorization ? (
        <Navigate to="/" />
      ) : (
        <>
          {task.errors ?? <div>{task.errors}</div>}
          <div>
            {task.tasks.map(task => (
              <div key={task._id}>
                <h2>{task.title}</h2>

                <p>{task.description}</p>

                {/* <input
                  type="checkbox"
                  onChange={() => handleChangeTask(task._id)}
                /> */}
                <button onClick={() => handleChangeTaskStatus(task._id)}>
                  Done
                </button>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
                <button onClick={() => handleEditTask(task._id)}>Edit</button>
                <hr />
              </div>
            ))}

            <Link to="/add-task">Add a new task</Link>
            <br />
            <Link to="/" onClick={() => dispatch(logout())}>
              Log out
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default TaskPage
