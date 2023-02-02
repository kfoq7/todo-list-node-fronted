import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddTask, EditTask, LoginPage, RegisterPage, TaskPage } from './pages'
import './App.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'task',
    element: <TaskPage />
  },
  {
    path: 'add-task',
    element: <AddTask />
  },
  {
    path: 'edit-task',
    element: <EditTask />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
