import React from 'react'
import service from '../appwrite/DB&Storage'
import { PostCard } from '../components'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AllPost = () => {
    const [posts, setPosts] = useState([])
    // const loading = useSelector(state => state.auth.loading)
    const [loading, setLoader] = useState(true)

    useEffect(() => {
        service.getAllPost([]).then(res => {
            if (res) {
                setPosts(res.documents)
            }
        })
            .finally(() => {
                setLoader(false)
            })
    }, [])
   
    
    return (
        <div className={`w-full  max-md:h-auto mt-10 mb-28 ${loading ? "flex items-center justify-center" : null}`}>
            {loading ? <div className='loader relative bottom-14'></div> : (
                <div className='flex flex-wrap w-full  mt-6 gap-5 items-center justify-center'>
                    {posts.length !== 0 ? posts.map(post => (
                        <PostCard key={post.$id} $id={post.$id} Img={post.Img} Title={post.Title} Content={post.Content} />
                    ))
                        : <h1 className='text-center text-3xl text-white font-bold font-mono'>No Post Exist
                            <br />
                            <Link to='/Create-Post'>
                                <span className='text-blue-600 cursor-pointer'>
                                    &nbsp;Create One
                                </span>
                            </Link>
                        </h1>
                    }
                </div>
            )}
        </div>
    )
}

export default AllPost