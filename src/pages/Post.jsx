import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import auth from "../appwrite/auth";
import authSlice from "../store/authSlice";
import HtmlParser from "react-html-parser";
import service from "../appwrite/DB&Storage";
import { Button } from "../components";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.user) 

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const isAuthor = post && userData ? post.UserId === userData.userData.$id : false;

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.Img);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 mx-5 flex justify-center items-center">

            <div className="w-full flex flex-col items-center max-w-sm text-black bg-gray-100 border-2 rounded-lg shadow-md p-10">

                <div className="h-52 mb-4 relative rounded-xl overflow-hidden">
                    <img
                        src={service.getFilePreview(post.Img)}
                        alt={post.Title}
                        className="w-full h-full rounded-xl object-cover object-[0px] transform hover:scale-105 transition duration-300"
                    />
                </div>
                <div className="mb-6 text-center">
                    <h1 className="text-2xl max-ss:text-[4vw] font-bold bg-gray-600 text-white shadow-lg p-4 rounded-xl">{post.Title}</h1>
                </div>
                <div className="text-center ">
                    {HtmlParser(post.Content)}
                </div>

                <div className="mt-5">
                    {isAuthor ? (
                        <div className="flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button name="Edit" bgColor="bg-green-500" />
                            </Link>
                            <Button name="Delete" bgColor="bg-red-500" callback={deletePost} />
                        </div>
                    ) : (
                        <h1 className="text-center font-bold mt-3">Created By <span className="text-blue-500">{post.UserName}</span></h1>
                    )}
                </div>
            </div>

        </div>
    ) : null;
}
