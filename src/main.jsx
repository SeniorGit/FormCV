import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/source-sans-3/latin-400.css'
import '@fontsource/source-sans-3/latin-400-italic.css'
import '@fontsource/source-sans-3/latin-600.css'
import '@fontsource/source-sans-3/latin-700.css'
import '@fontsource/source-sans-3/latin-ext-400.css'
import '@fontsource/source-sans-3/latin-ext-600.css'
import '@fontsource/source-sans-3/latin-ext-700.css'
import '@fontsource/source-serif-4/latin-600.css'
import '@fontsource/source-serif-4/latin-700.css'
import '@fontsource/source-serif-4/latin-ext-600.css'
import '@fontsource/source-serif-4/latin-ext-700.css'

import './styles/base.css'
import './styles/editor.css'
import './styles/resume.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
