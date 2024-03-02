import React, { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner';
import axios from '../axios'
import { Amazon_url } from '../constants';
import { PostEntity } from '../models/post';
import { useDebouncedValue } from './useDebounce'
import { categories } from '../constants'

const CreatePin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [imageAssets, setImageAssets] = useState<boolean>(false)
    const [wrongImageType, setWrongImageType] = useState<boolean>(false)
    const [uploadImageUrl, setUploadImageUrl] = useState<string>('')
    const [category, setCategory] = useState<string>('');
    const [createPost, setCreatePost] = useState<any>(new PostEntity())

    const navigate = useNavigate()
    const debouncedSearchTerm = useDebouncedValue(createPost.caption, 500);

    const onTextUpdateHandler = (e: any) => {
        setCreatePost({ ...createPost, caption: e.target.value })
    }

    useEffect(() => {
        console.log("debouncedSearchTerm ---->", debouncedSearchTerm)
    }, [debouncedSearchTerm])

    const onImageUploadHandler = (e: any) => {
        const selectedFile = e?.target?.files[0];
        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg'
            || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
            setWrongImageType(false)
            const formData = new FormData();
            formData.append('file', selectedFile, selectedFile.name);
            setLoading(true)
            axios.post('/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res: any) => {
                if (res?.data?.status) {
                    setImageAssets(true)
                    setLoading(false)
                    setUploadImageUrl(Amazon_url + `${res?.data?.imageResult?.filepath}`)
                }
                console.log("res --", res)
            }).catch((err: any) => console.log("error --->", err))
        } else {
            setWrongImageType(false)
        }
    }

    if (loading) {
        return <Spinner message='Fetching image from the source' visible={loading} />
    }


    const onUploadPostHandler = () => {
        const data = {
            caption: createPost?.caption,
            createdAt: new Date().toISOString(),
            userId: "598a624c-1db6-4c9e-995a-f3d8f47d5570",
            image_url: uploadImageUrl,
            location: "Bahadurgarh Sapno ka Sehar",
            updatedAt: new Date().toISOString(),
            category: category
        }

        axios.post('/post', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            if (res.data.status) {
                navigate('/')
            }
        }).catch((error: any) => {
            console.log("err--->", error)
        })
    }
    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            <div className='flex bg-secondaryColor flex-col justify-center items-center lg:p-5 p-3 lg:w-4/5 w-full'>
                <div className='flex flex-0.7 justify-center items-center w-full h-full'>
                    <div className='bg-secondaryColor flex flex-col justify-center items-center w-full h-[400px] border-2 border-dotted border-black p-3'>
                        {
                            wrongImageType && (
                                <p>It&apos;s wrong file type.</p>
                            )
                        }
                        {!imageAssets ? (
                            <label className='flex justify-center items-center flex-col'>
                                <AiOutlineCloudUpload className='w-10 h-10' />
                                <p className='text-lg'>Click to Upload</p>
                                <p className='mt-32 text-lightGray'>
                                    use high quality JPG, SVG, PNG or GIF less than 20mb
                                </p>
                                <input
                                    type='file'
                                    name='upload-image'
                                    onChange={onImageUploadHandler}
                                    className='w-0 h-0' />
                            </label>) :
                            (
                                <div className='relative w-full h-full'>
                                    <img crossOrigin="anonymous" src={uploadImageUrl} alt='' className='w-full h-full object-contain' />
                                    <button
                                        className="absolute bottom-3 right-3 p-3 cursor-pointer outline-none"
                                        onClick={() => setImageAssets(false)}>
                                        <MdDelete className='w-10 h-5' fill='#FF0000' />
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center  w-full mt-5 p-4'>
                    <input
                        placeholder='Add the caption here'
                        className='m-1 p-2 w-full rounded-md h-10 border-2 border-e-black border-solid text-lg outline-none focus-within:shadow-lg'
                        onChange={(e: any) => onTextUpdateHandler(e)} />
                    <input
                        placeholder='Add the type here of image'
                        className='m-1 p-2 w-full rounded-md h-10 border-2 border-e-black border-solid text-lg outline-none focus-within:shadow-lg'
                    />

                    <div className='w-full flex justify-center items-center flex-col mt-4'>
                        <p className="mb-2 text-center w-1/2 font-semibold text:lg sm:text-xl">Choose Pin Category</p>
                        <select
                            onChange={(e: any) => {
                                setCreatePost({ ...createPost, category: e.target.value })
                                setCategory(e.target.value);
                            }}
                            className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                        >
                            <option value="others" className="sm:text-bg bg-white">Select Category</option>
                            {categories.map((item, index: any) => (
                                <option key={index} className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className='bg-buttonPrimaryColor mt-2 p-2 w-40 h-[45px] hover:shadow-lg border-2 border-solid rounded-lg'
                        onClick={() => onUploadPostHandler()}>Upload Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePin
