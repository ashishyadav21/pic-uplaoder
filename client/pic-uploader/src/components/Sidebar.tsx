import React from 'react'
import logo from '../assets/logo.png'

type User = {
    firstName: '',
    lastName: '',
    image: ''
}

interface Props {
    user: User,
    closeToggle?: (value: boolean) => void
}

const Sidebar = (props: Props) => {
    return (
        <div>Sidebar</div>
    )
}

export default Sidebar
