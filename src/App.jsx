import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import LessonCard from './components/LessonCard'
function App() {
  return (
    <>
    <Navbar/>
    <Home/>
    <LessonCard/>
    </>
  )
}

export default App
