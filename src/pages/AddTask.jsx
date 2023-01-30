import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
  const [newTask, setNewTask] = useState({
    tittle: '',
    description: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target

    setNewTask({
      ...newTask,
      [name]: value
    })
  }

  const handleSubmit = () => {
    navigate('/task')
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
