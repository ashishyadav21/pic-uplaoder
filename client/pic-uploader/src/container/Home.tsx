
import React, { useState, useRef } from 'react'
import { Sidebar } from '../components'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo from '../assets/logo.png'

import { Link, Route, Routes } from 'react-router-dom'
import UserProfile from '../components/UserProfile'
import Pins from './Pins'

const user = {
  firstName: 'Ashish',
  lastName: 'Yadav',
  image: 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY'
}

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const scrollRef = useRef(null);

  console.log("localStorage.getItem('user') -->", localStorage.getItem('user'))
  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '') : localStorage.clear()

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28' />
        </Link>
        <Link to={`user-profile/${user?.id}`}>
          <img src={user?.image} alt='logo' className='w-28 h-40' />
        </Link>
      </div>

      {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in '>
          <div className=' absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
      )}

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
