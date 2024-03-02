import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import logo from '../assets/logo.png'

interface props {
    setSearchTerm: (a: any) => void
    searchTerm: string
    user?: any
}

const Navbar = (props: props) => {

    const navigate = useNavigate();
    // if (!props.user) return null
    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
                <IoMdSearch fontSize={21} className='ml-1' />
                <input type='text'
                    onChange={(e) => props.setSearchTerm(e.target.value)}
                    placeholder='Search'
                    value={props.searchTerm}
                    onFocus={() => navigate('/search')}
                    className='p-2 w-full bg-white outline-none' />
            </div>
            <div className='flex gap-3'>
                <Link to={`user-profile/${props.user?.id}`} className='hidden md:block'>
                    <img src={logo} alt='user' className='w-30 h-10 rounded-lg' />
                </Link>
                <Link to='create-pin' className='bg-black text-white rounded-lg w-10 h-10 md:w-30 md:h-30 flex justify-center items-center'>
                    <IoMdAdd className='ml-1 w-10 h-10' />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
