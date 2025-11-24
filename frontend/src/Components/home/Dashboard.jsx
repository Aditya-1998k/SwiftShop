import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate("/user")
  }
  return (
    <div>
        <h1>Dashboard</h1>
        <button className='bg-amber-300' onClick={handleClick}>User</button>
    </div>
  )
}

export default Dashboard