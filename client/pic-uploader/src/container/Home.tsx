
import React, { useState } from 'react'
import { Sidebar } from '../components'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo from '../assets/logo.png'

import { Link, Route, Routes } from 'react-router-dom'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  console.log("ocalStorage.getItem('user') -->", localStorage.getItem('user'))
  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '') : localStorage.clear()

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
        <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28' />
        </Link>
        <Link to={`user-profile/${user?.id}`}>
          <img src={logo} alt='logo' className='w-28' />
        </Link>
      </div>
    </div>
  )
}

export default Home
