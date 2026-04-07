import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import ShowText from './components/ShowText.jsx'
import UserInput from './components/UserInput.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <UserInput />
    <ShowText />
  </StrictMode>
)