import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import Pin from './Pin'
import CreatePin from './CreatePin'
import axios from '../axios'


const Feed = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { categoryId } = useParams();
    const [allPosts, setAllPosts] = useState<[]>([])

    // console.log("categoryId ---->", categoryId)

    useEffect(() => {
        if (categoryId === undefined) {
            getAllPosts()
        } else {
            console.log("categoryId --->", categoryId)
            getPostBasedOnCategory(categoryId)
        }
    }, [categoryId])

    const getPostBasedOnCategory = (value: any) => {
        console.log("value --->", value)
        axios.get(`/post/${value}`).then((res: any) => {
            console.log("post --->", res)
            setAllPosts(res?.data?.posts)
        }).catch((error: any) => {
            console.log("error ---<", error)
        })
    }
    const getAllPosts = () => {
        axios.get('/post').then((res: any) => {
            console.log("post --->", res)
            setAllPosts(res?.data?.posts)
        }).catch((error: any) => {
            console.log("error ---<", error)
        })
    }

    // useEffect(() => {
    //     setLoading(true)

    //     if (categoryId) {

    //     } else {

    //     }
    // }, [categoryId])

    if (loading) return <Spinner message='We are adding new ideas to your feed!' />
    return (
        <div>
            <MasonryLayout images={allPosts} />
            {/* <Pin postedBy='ashish'
                image='asd'
                id='adssad'
                destination='string' /> */}
            {/* <CreatePin />¯¯ */}
        </div>
    )
}

export default Feed
