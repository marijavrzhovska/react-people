import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Dashboard from './Components/Dashboard.tsx'
import PersonsList from './Components/PersonsList.tsx'
import PersonDetail from './Components/PersonDetail.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {index: true, element: <Navigate replace to='/dashboard'/>},
      {path: '/dashboard', element: <Dashboard/>},
      {path: '/persons', element: <PersonsList/>},
      {path: '/persons/:id', element: <PersonDetail/>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
