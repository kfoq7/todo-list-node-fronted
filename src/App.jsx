import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddTask, LoginPage, RegisterPage, TaskPage } from "./pages";
import "./App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "task",
    element: <TaskPage />,
  },
  {
    path: "add-task",
    element: <AddTask />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
