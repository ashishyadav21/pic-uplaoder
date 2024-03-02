import React, { useState } from 'react'
import { CreatePin, Feed, Navbar, PinDetail, Search, Sidebar, UserProfile } from '../components/index'
import { Route, Routes } from 'react-router-dom'

type User = {
    firstName: '',
    lastName: '',
    image: ''
}
interface Props {
    user: User,
    closeToggle?: (value: boolean) => void
}

const Pins = (props: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    return (
        <div className='px-2 md:px-5'>
            <div className='bg-gray'>
                <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Feed />} />
                    <Route path='/category/:categoryId' element={<Feed />} />
                    <Route path='/pin-detail/:pinId' element={<PinDetail />} />
                    <Route path='/create-pin' element={<CreatePin />} />
                    <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                    <Route path='/' element={<Feed />} />
                </Routes>
            </div>
        </div>
    )
}

export default Pins
