import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Employee } from './component/Employee'
import { Nav } from './component/Nav'

function App() {

  return (
    <>
    <Nav/>
    <Employee/>
    </>
  )
}

export default App
