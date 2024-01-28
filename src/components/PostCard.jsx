import React from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/DB&Storage';
import HtmlParser from 'react-html-parser';

const PostCard = ({ $id, Img, Title, Content, Auther }) => {
    return (
        <Link to={`/post/${$id}`} className='w-full max-h[400px] max-w-[300px]'>
            <div className={` bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform   hover:scale-[1.01]`}>
                <img
                    src={service.getFilePreview(Img)}
                    alt={Title}
                    className='w-full h-64 object-cover'
                />
                <div className='p-6'>
                    <h2 className='text-xl font-bold text-gray-800 mb-2'>{Title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
