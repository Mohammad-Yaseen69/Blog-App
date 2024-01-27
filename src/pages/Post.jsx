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
        <div className="py-8 flex h-screen relative bottom-10 justify-center flex-col items-center">

            <div className="border-2 flex flex-col justify-center items-center  p-10 rounded-lg">

                <div className=" h-52 flex justify-center mb-4 relative  rounded-xl overflow-hidden">

                    <img
                        src={service.getFilePreview(post.Img)}
                        alt={post.Title}
                        className="rounded-xl object-cover transform hover:scale-105 transition duration-300"
                    />


                  
                </div>
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold bg-gray-600 text-white shadow-lg  p-4 rounded-xl">{post.Title}</h1>
                </div>
                <div className="text-center browser-css ">
                    {HtmlParser(post.Content)}
                </div>

                <div>
                {isAuthor && (
                        <div className="flex gap-3 mt-5">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button name="Edit" bgColor="bg-green-500" className="mr-3" />
                            </Link>

                            <Button name="Delete" bgColor="bg-red-500" callback={deletePost} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    ) : null;
}