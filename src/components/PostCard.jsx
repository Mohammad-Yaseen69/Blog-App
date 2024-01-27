import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/DB&Storage'

const PostCard = ({ $id, Img, Title, Content }) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white rounded-xl shadow-md p-4 transition-transform transform hover:scale-105'>
                <div className='w-full mb-4'>
                    <img
                        src={service.getFilePreview(Img)}
                        alt={Title}
                        className='w-full h-32 text-black object-cover rounded-xl'
                    />
                </div>
                <h2 className='text-3xl text-center text-black font-bold'>{Title}</h2>
                <p>
                    {Content.substring(0, 20)}...
                    <span className='text-blue-500 font-bold'>Read More</span>

                </p>
            </div>
        </Link >
    )
}

export default PostCard