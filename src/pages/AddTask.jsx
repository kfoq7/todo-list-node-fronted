import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { axiosFetch } from '../axios'
import { addTask } from '../redux/slices/taskSlice'

const AddTask = () => {
  const [newTask, setNewTask] = useState({
    tittle: '',
    description: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)

  const handleChange = e => {
    const { name, value } = e.target

    setNewTask({
      ...newTask,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // try {
    //   await axiosFetch.post(`/user/${auth.user._id}/create-task`, newTask, {
    //     headers: {
    //       Authorization: `Bearer ${auth.token}`
    //     }
    //   })

    //   navigate('/task')
    // } catch (error) {
    //   console.log(error)
    // }

    dispatch(
      addTask({ userId: auth.user._id, token: auth.token, task: newTask })
    )

    navigate('/task')
  }

  return (
    <>
      {!auth.authorization ? (
        <Navigate to="/" />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>

            <div>
              <label>Title: </label>
              <input type="text" name="title" onChange={handleChange} />
            </div>
            <div>
              <label>Description: </label>
              <input type="text" name="description" onChange={handleChange} />
            </div>

            <input type="submit" value="AddTask" />
          </form>

          <Link to="/task">Back</Link>
        </div>
      )}
    </>
  )
}

export default AddTask
