import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserContextProvider } from './contexts/UserContext.jsx'
import { UsersContextProvider } from './contexts/UsersContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider >
      <UserContextProvider>
        <UsersContextProvider>
          <Router>
            <App />
          </Router>  
        </UsersContextProvider>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)