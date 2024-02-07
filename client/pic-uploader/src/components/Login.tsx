import React from 'react';
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4"
import axios from 'axios';
import { useForm } from "react-hook-form";
interface user {
    _id: string,
    _type: string,
    userName: string,
    image: string
}

const Login = () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            dateofbirth: ''
        }
    });

    const onUserRegisterHandler = (userDetail: user) => {
        axios.post('http://localhost:3000/users', userDetail)
            .then(function (response: any) {
                console.log("response --->", response)
                localStorage.setItem('token', response?.data?.result?.token)
                localStorage.setItem('user', JSON.stringify(response?.data?.result?.user))
                navigate('/home')
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }


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
                    <form
                        className="bg-purple p-0.5 rounded-3xl mt-2 top-5 shadow-silver shadow-lg"
                        onSubmit={handleSubmit((data: any) => {
                            onUserRegisterHandler(data)
                        })}
                    >

                        <div className='p-2 '>
                            <div className=" container shadow-white shadow-2xl bg-pinkColor p-5 flex flex-col rounded-3xl">
                                <h1 className='text-2xl text-lightGray'> Create an Account</h1>
                                <div className='flex flex-col mt-4 divide-y divide-slate-700'>
                                    <div className='p-4 h-14 flex justify-start items-center'>
                                        <input className='outline-none bg-pinkColor text-lightGray placeholder-gray'  {...register("username", { required: true, maxLength: 10 })}
                                            placeholder="UserName" />
                                        {errors.username && <span className='text-red'>This field is required</span>}
                                    </div>
                                    <div className='p-4 h-14 flex justify-between items-center'>
                                        <input className='outline-none bg-pinkColor text-lightGray text-placeholderColor' placeholder="Enter Email (Optional)" {...register("email", { required: true, maxLength: 20 })} />
                                    </div>
                                    <div className='p-4 h-14 flex justify-between items-center'>
                                        <input className='outline-none bg-pinkColor placeholder-black text-lightGray text-placeholderColor' placeholder="First Name" {...register("firstName", { required: true, maxLength: 20 })} />
                                    </div>
                                    <div className='p-4 h-14 flex justify-between items-center'>
                                        <input className='outline-none bg-pinkColor placeholder-black text-lightGray text-placeholderColor' placeholder="Last Name" {...register("lastName", { required: true, maxLength: 20 })} />
                                    </div>
                                    <div className='p-4 h-14 flex justify-between items-center'>
                                        <input className='outline-none bg-pinkColor placeholder-black text-lightGray text-placeholderColor' placeholder="Date of Birth" {...register("dateofbirth", { required: true, maxLength: 20 })} />
                                    </div>
                                    <div className='p-4 h-14 flex justify-between items-center'>
                                        <input className='outline-none text-lightGray placeholder-black bg-pinkColor text-placeholderColor' placeholder="Password" {...register("password", { required: true, maxLength: 20 })} />
                                        {errors.password && <span className='text-red'>This field is required</span>}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </div>

                                    <div className='pt-4'>
                                        <input className='mr-4 bg-lightGray' type="checkbox" id='checkbox' value='agreement' />
                                        <label className='text-xs text-lightGray'>I hearby confirm that I am above 18 years old.</label>
                                    </div>
                                </div>
                                <button className='bg-blackOverlay mt-5 border p-2 cursor-pointer text-lightGray rounded-xl' type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    )
}

export default Login
