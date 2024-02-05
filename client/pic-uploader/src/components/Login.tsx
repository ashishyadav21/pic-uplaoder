import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/logo.png'
import shareVideo from "../assets/share.mp4"
import { useAuth0 } from "@auth0/auth0-react";
import { client } from "../client"

interface user {
    _id: string,
    _type: string,
    userName: string,
    image: string
}

const Login = () => {
    const { loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate()


    console.log("user --->", user)

    useEffect(() => {
        if (user) {

            const doc = {
                _id: user?.sub || 'defaultId',
                _type: 'user',
                userName: user?.name,
                image: user?.picture
            };

            (async () => {
                const token = await getAccessTokenSilently();
                const result = client.createIfNotExists(doc)
                localStorage.setItem("token", token)
                navigate('/home')
            })();
        }
    }, [user])

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    autoPlay
                    loop
                    controls={false}
                    muted
                    typeof='video/mp4'
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} alt='logo' width="170px" />
                        <button className='bg-mainColor p-2 mt-3 flex justify-center items-center shadow-2xl rounded-lg outline-none cursor-pointer'
                            onClick={() => loginWithRedirect()}>
                            <FcGoogle className='mr-4' /> SignIn with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
