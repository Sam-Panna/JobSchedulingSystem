import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage'
// import Dashboard from './component/Dashboard'
import DashboardPage from './Pages/DashboardPage'
import Main from './component/Dashboard/Layout/Main'


function App() {

  

  const router = createBrowserRouter([
   {
     path : "/",
     element : <LoginPage/>
    // element: <DashboardPage/>
   },
   {
    path: "/dashboard",
    element: <Main/>,
    children: [
      {
        path: "",
        element: <DashboardPage/>
      },
      {
        path: "/employee-management",
        element: <EmployeeManagement/>
      }
    ]
   }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>

  )
}

export default App
