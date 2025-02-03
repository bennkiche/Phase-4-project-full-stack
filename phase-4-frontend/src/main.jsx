import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/NavBar.css'
import './Pages/TestsContainer.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
