import React from 'react'
import { Circles } from 'react-loader-spinner'

interface props {
    message: string
    visible?: boolean
}

const Spinner = (props: props) => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={props.visible}
            />
            <p className='text-lg text-center px-2'>{props.message}</p>
        </div>
    )
}

export default Spinner
