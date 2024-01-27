import React, { useEffect, useState } from 'react'
import { PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/DB&Storage';

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    console.log(post);
    return post ? (
        <div className='py-8'>
            <PostForm post={post} />
        </div>
    ) : null
}

export default EditPost