import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import NewPost from "./new-post.jsx";
import Logout from "./logout.jsx";
import PostCard from "./post.jsx";

export default function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function fetchPosts() {
            try {
                const res = await fetch(`/api/posts`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();

                if (res.ok) {
                    setPosts(data);
                    console.log('data:', data);
                } else if (res.status === 401) {
                    navigate('/login');
                } else {
                    console.error('fetch post: ', data.error);
                }
            } catch (err) {
                console.error('fetch post: ', err);
            }
        }

        fetchPosts().then();
    }, [navigate]);

    let postList;
    const isEmpty = (!posts || posts.length === 0);
    if (isEmpty) {
        postList = <h1>No posts found.</h1>
    } else {
        postList = posts.map(post => (
            /** @namespace post.author.fullname **/
            /** @namespace post._id **/
            <PostCard post={post} key={post._id}/>
        ));
    }

    return (
        <>
            <NewPost />
            <Logout />
            {postList}
        </>
    );
}
