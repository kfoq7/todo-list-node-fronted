import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { axiosFetch } from '../axios'

const AddTask = () => {
  const [newTask, setNewTask] = useState({
    tittle: '',
    description: ''
  })

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

    try {
      await axiosFetch.post(`/user/${auth.user._id}/create-task`, newTask, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })

      navigate('/task')
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
    </div>
  )
}

export default AddTask
