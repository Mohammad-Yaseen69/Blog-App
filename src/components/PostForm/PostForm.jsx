import React, { useCallback, useState, useEffect } from 'react'
import { Button, InputField, Select, RTE } from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import service from '../../appwrite/DB&Storage'
import { useNavigate } from 'react-router-dom'

const PostForm = ({ post }) => {

    const { register, handleSubmit, control,
        watch, setValue, getValues } = useForm({
            defaultValues: {
                Title: post?.Title ? post?.Title : '',
                slug: post?.$id ? post?.$id : '',
                Content: post?.Content ? post?.Content : '',
                Status: post?.Status ? post?.Status : 'active',
            }
        })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.user)
    const [error, setError] = useState("")


    const submit = async (data) => {
        setError("")
        

        try {
            if (post) {
                const file = await data.images[0] ? service.uploadFile(data.images[0]) : null
                const fileId = await file


                if (file) {
                    service.deleteFile(post.Img)
                }
                const postUbdate = await service.updatePost(
                    post.$id,
                    {
                        ...data,
                        Img: file ? fileId.$id : post.Img,
                    }
                )
                if (postUbdate) {
                    navigate(`/post/${post.$id}`)
                }
            }
            else {
                const file = await data.images[0] ? service.uploadFile(data.images[0]) : null
                const fileId = await file
                const post = await service.createPost({
                    ...data,
                    Img: fileId.$id,
                    UserId: userData.userData.$id,
                    UserName : userData.userData.name
                })
                console.log(post);
                if (post) {
                    navigate(`/post/${post.$id}`)
                }

            }
        } catch (error) {
            setError(error.message)
            console.log(error);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string' && value.length > 0) {
            return value.trim().toLowerCase().replace(/^[a-zA-Z\d] + /g, '-').replace(/ /g, '-')
        }
        return ''
    }, [setValue])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'Title') {
                setValue('slug', slugTransform(value.Title))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform])


    return (
        <>
            <form onSubmit={handleSubmit(submit)} className='w-full flex max-md:flex-col justify-center items-center gap-3'>
                <div className='w-[70%] max-xs:w-[90%] flex flex-col  gap-4'>
                    <InputField name='Title'
                        lable='Title'
                        className="w-full"
                        {...register('Title', { required: true })}
                    />
                    <InputField name='slug'
                        lable='Slug'
                        className="w-full"
                        onInput={(e) => {
                            setValue('slug', e.currentTarget.value)
                        }}
                        {...register('slug', { required: true })}
                    />
                    <RTE
                        lable="Content :"
                        name="Content"
                        control={control}
                        {...register('Content' , {required: !post}) }
                        defaultValue={getValues("Content")} />

                </div>

                <div className='flex gap-4 md:self-start max-md:items-center flex-col justify-center items-start'>
                    <Select
                        label='Status'
                        options={["active", "inactive"]}
                        {...register('Status', { required: true })} />
                    <InputField
                        name='images'
                        lable='Image'
                        type='file'
                        className='bg-white'
                        {...register('images', { required: !post })} />

                    <Button type='submit' name={'Submit'} className={'w-full'} />
                </div>
            </form>
        </>
    )
}
export default PostForm