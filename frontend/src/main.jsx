import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Authentication from './Authentication/Authentication.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authentication/>
  </StrictMode>,
)
