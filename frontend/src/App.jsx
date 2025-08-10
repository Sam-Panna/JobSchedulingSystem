import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage'
// import Dashboard from './component/Dashboard'
import DashboardPage from './Pages/DashboardPage'
import Main from './component/Dashboard/Layout/Main'
import EmployeeTable from './component/EmployeeMgmt/EmployeeTable'
import EmployeeForm from './component/EmployeeMgmt/EmployeeForm'
import EditEmployee from './component/form/EditEmployee'
import TaskForm from './component/TaskMgmt/TaskForm'
import ManageTask from './component/TaskMgmt/ManageTask'
import AdminProfile from './component/Profile/AdminProfile'
import EmployeeProfile from './component/Profile/EmployeeProfile'
import EmployeeMain from './component/EmployeeDashboard/Layout/EmployeeMain'
import EmployeeDashboard from './component/EmployeeDashboard/EmployeeDashboard'
import MyTasks from './component/EmployeeDashboard/MyTasks'


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/dashboard",
      element: <Main />,
      children: [
        {
          path: "",
          element: <DashboardPage />
        },
        {
          path: "employee-table",
          element: <EmployeeTable />
        },
        {
          path: "add-employee",
          element: <EmployeeForm />
        },
        {
          path: "edit-employee/:id",
          element: <EditEmployee />
        },
        {
          path: "task-management",
          element: <ManageTask />
        },
        {
          path:"task-form",
          element:<TaskForm/>
        },
       {
          path: "admin-profile",
          element: <AdminProfile />
        },
        {
          path:"employee-profile",
          element:<EmployeeProfile/>
        }
      ]
    },
    {
       path: "/employee-dashboard",
      element: <EmployeeMain/>,
      children: [
        {
          path:"",
          element:<EmployeeDashboard/>
          
        },
        {
          path:"/employee-dashboard/mytasks",
          element:<MyTasks/>
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
