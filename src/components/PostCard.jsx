import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/DB&Storage'

const PostCard = ({ $id, Img, Title, Content }) => {
    const contentWithoutPTag = Content.replace(/<\/?p>/g, '');
    return (
        <Link to={`/post/${$id}`}>
            <div className='max-w-full min-h-[50vh] flex flex-col justify-center items-center bg-blue-200 rounded-xl shadow-md p-4 transition-transform transform hover:scale-[1.010]'>
                <div className='max-w-full mb-4'>
                    <img
                        src={service.getFilePreview(Img)}
                        alt={Title}
                        className='w-full max-h-56 text-black object-cover rounded-xl'
                    />
                </div>
                <h2 className='text-3xl text-center text-black font-bold'>{Title}</h2>
                <div className='text-black mt-5 text-center min-w-full text-bold overflow-hidden'>
                    <p className='inline-block'>{contentWithoutPTag.substring(0, 30)}...</p>
                    <span className='text-blue-500 font-bold'>Read More</span>
                </div>
            </div>

        </Link >
    )
}

export default PostCard