import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Cards from "../../Components/Cards/Cards";

import Login from "../../Pages/Login/Login";
import Main from "./Main";
import Register from "../../Pages/Login/Register";
import AddTask from "../../Components/AddTask/AddTask";
import UpdateTask from "../../Components/UpdateTask/UpdateTask";
import PrivateRoute from "../../Provider/PrivateRoute/PrivateRoute";
import TaskDashboard from "../../Pages/Dashboard/TaskDashboard/TaskDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "mytask",
        element: <Cards></Cards>,
      },
      {
        path: "taskdashboard",
        element: <TaskDashboard />,
      },

      {
        path: "addtask",
        element: <AddTask></AddTask>,
      },
      {
        path: "updatetask/:id",
        element: <UpdateTask></UpdateTask>,
      },
    ],
  },
]);
