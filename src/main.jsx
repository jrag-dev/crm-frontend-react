import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, HashRouter} from 'react-router-dom'

import App from './routes/App'
import './index.css'
import AuthState from './context/auth/authState'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthState>
        <App/>
      </AuthState>
    </HashRouter>
  </React.StrictMode>
)
