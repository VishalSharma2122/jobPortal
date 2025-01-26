import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import login from './components/ui/Auth/login'
import singup from './components/ui/Auth/singup'


const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<login/>
  },
  {
    path:'/signup',
    element:<singup/>
  },

])
function App() {
 

  return (
    <>
<RouterProvider router={appRouter}/>
    </>
  )
}

export default App
