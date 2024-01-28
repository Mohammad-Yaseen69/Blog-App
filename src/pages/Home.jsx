import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components'


const Home = () => {
    const status = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const loader = useSelector(state => state.auth.loading)
    const data = useSelector(state => state.auth.user)
    return (

        <div className='w-full h-screen flex items-center  justify-center relative bottom-2'>
            {loader ? <div className='loader'> </div> : status ?
                <div className='w-[70%] max-md:w-full mb-40 items-center flex flex-col gap-7'>
                    <h1 className='font-bold max-ss:text-[6vw] max-sm:text-[4.5vw] text-[3vw]'>Welcome <span className='text-green-700'>{data.userData?.name}</span></h1>
                    <p className='text-center w-[70%] max-sm:w-[90%] max-ss:text-[3vw] max-sm:text-[2vw] font-semibold'>This is a web application designed for users to create, read, and manage blog posts. It includes authentication features for secure access and additional functionalities to enhance the blogging experience.</p>
                    <div className='flex gap-4'>
                        <Button name="See Posts" callback={() => navigate("/posts")} />
                        <Button name="Create Post" callback={() => navigate("/Create-Post")}></Button>
                    </div>
                </div>
                :
                <div className='w-[70%] mb-40 items-center flex flex-col gap-7'>
                    <h1 className='font-bold max-ss:text-[6vw] max-sm:text-[4.5vw] text-[3vw]'>Welcome </h1>
                    <p className='text-center w-[70%] max-sm:w-[90%] max-ss:text-[3vw] max-sm:text-[2vw] font-semibold'>This is a web application designed for users to create, read, and manage blog posts. It includes authentication features for secure access and additional functionalities to enhance the blogging experience.</p>
                    <p className='text-red-500 font-bold'>Login to Read and Create Posts</p>
                </div>}
        </div>
    )
}

export default Home