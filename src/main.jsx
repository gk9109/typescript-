import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TaskForm, TaskDisplay } from './components/Tasks.tsx'
import '../src/style/main.css'
import { Tags } from './components/Tags.jsx'
import  Archive  from './components/Archive.tsx'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Tags />
      <Routes>
        <Route path="/tasks" element = {<TaskDisplay />} />
        <Route path="/" element = {<TaskForm />} />
        <Route path='/archive' element = {<Archive />} />
      </Routes>
    </Router>
  </StrictMode>,
)

const rootDiv = document.getElementById('root');
