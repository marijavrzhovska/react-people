import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Dashboard from './Components/Dashboard.tsx'
import PersonsList from './Components/PersonsList.tsx'
import PersonDetail from './Components/PersonDetail.tsx'
import { MessageProvider } from './context/MessageContext.tsx'
import PeopleForm from './Components/PeopleForm.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {index: true, element: <Navigate replace to='/dashboard'/>},
      {path: '/dashboard', element: <Dashboard/>},
      {path: '/persons', element: <PersonsList/>},
      {path: '/persons/:id', element: <PersonDetail/>},
      {path: '/persons/create', element: <PeopleForm/>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MessageProvider>
      <RouterProvider router={router}/>
    </MessageProvider>
  </StrictMode>,
)
