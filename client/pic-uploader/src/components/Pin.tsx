import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { Navigate } from 'react-router-dom';



interface props {
    postedBy: string,
    image: string,
    id: string,
    destination: string
}
const Pin = (props: props) => {
    const [postHover, setPostHover] = useState<boolean>(false)
    const [savingPost, setSavingPost] = useState<boolean>(false)


    const navigate = useNavigate()
    return (
        <div className='m-2'>
            <div onMouseEnter={() => setPostHover(true)}
                onMouseLeave={() => setPostHover(false)}
                onClick={() => navigate(`/pin-detail/${props.id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>
                <img className='rounded-lg w-full' alt='user-post' src='https://images.unsplash.com/photo-1639577171043-0836b682c65f?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3' />
                {postHover && (
                    <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={{ height: '100%' }}>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a
                                    href={`${props.image}`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outl'>
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                        </div>

                    </div>
                )}
            </div>

        </div>
    )
}

export default Pin
