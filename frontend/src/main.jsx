import React from 'react' // Or StrictMode, etc.
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <-- THIS LINE IS ESSENTIAL

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)