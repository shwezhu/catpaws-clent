import CreatePostArea from "./CreatePostArea.jsx";
import PostCard from "./PostCard.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

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
            <PostCard post={post} key={post._id}/>
        ));
    }

    return (
        <div className={'flex flex-row h-screen'}>
            <div className={'h-full basis-1/4 border-r-2'}>
                123
            </div>
            <div className={'h-full basis-2/5 overflow-y-auto'}>
                <CreatePostArea/>
                <div className={'flex flex-col'}>
                    {postList}
                </div>
            </div>
        </div>
    );
}
