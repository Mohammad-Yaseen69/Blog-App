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
        <div className="py-8">

            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={service.getFilePreview(post.Img)}
                    alt={post.Title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button name="Edit" bgColor="bg-green-500" className="mr-3" />
                        </Link>

                        <Button name="Delete" bgColor="bg-red-500" callback={deletePost} />
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {HtmlParser(post.Content)}
            </div>

        </div>
    ) : null;
}