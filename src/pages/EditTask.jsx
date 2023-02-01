import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const EditTask = () => {
  const { authorization } = useSelector(state => state.auth)

  const handleChange = () => {}

  const handleSubmit = () => {}

  return (
    <>
      {!authorization ? (
        <Navigate to="/" />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>

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

export default EditTask
