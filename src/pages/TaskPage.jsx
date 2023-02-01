import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { axiosFetch } from "../axios";
import { logout } from "../redux/slices/authSlice";
import {
  deleteTask,
  fetchUserTasks,
  updateStatusTask,
} from "../redux/slices/taskSlice";

const TaskPage = () => {
  // const [tasks, setTasks] = useState([])
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const task = useSelector((state) => state.task);

  // console.log(task)
  // const fetchTaskData = async () => {
  //   const response = await axiosFetch.get(`/user/${auth.user._id}`, {
  //     headers: {
  //       Authorization: `Bearer ${auth.token}`
  //     }
  //   })

  //   setTasks(response.data.tasks)
  // }

  const handleChangeTaskStatus = (taskId) => {
    setCheck(!check);

    const status = check ? "COMPLETED" : "PENDING";

    dispatch(
      updateStatusTask({
        userId: auth.user._id,
        taskId,
        status,
        token: auth.token,
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    // axiosFetch.delete(`/user/delete-task/${auth.user._id}/${taskId}`, {
    //   headers: {
    //     Authorization: `Bearer ${auth.token}`
    //   }
    // })
    dispatch(deleteTask({ userId: auth.user._id, taskId, token: auth.token }));
  };

  useEffect(() => {
    dispatch(fetchUserTasks({ userId: auth.user._id, token: auth.token }));
    // fetchTaskData()
  }, []);

  return (
    <>
      {!auth.authorization ? (
        <Navigate to="/" />
      ) : (
        <>
          {task.errors ?? <div>{task.errors}</div>}
          <div>
            <h2>Task List</h2>
            {task.tasks.map((task) => (
              <div className="item-container" key={task._id}>
                <div className="item">{task.title}</div>
                <div className="item">{task.description}</div>
                <button
                  className="button"
                  onClick={() => handleChangeTaskStatus(task._id)}
                >
                  Done
                </button>
                <button
                  className="button"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <br />
            <Link className="item" to="/add-task">
              Add Task
            </Link>

            <Link className="item" to="/" onClick={() => dispatch(logout())}>
              Log out
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default TaskPage;
