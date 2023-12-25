import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import NewPost from "./new-post.jsx";

export default function Home(props) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(fetchPosts, [navigate, props.userID]);

    const isEmpty = (!posts || posts.length === 0);
    const emptyPost = <h1>No posts found.</h1>
    let postList = posts.map(post => (
        /** @namespace post._id **/
        /** @namespace post.likes **/
        <div key={post._id} className="post">
            <p>{post.text}</p>
            {post.images.map((image, index) => (
                <img key={index} src={image} alt={`Post ${post._id}`}/>
            ))}
            <div>
                Likes: {post.likes?.length}
                Comments: {post.comments.length}
            </div>
        </div>
    ));

    postList = isEmpty ? emptyPost : postList;
    return (
        <>
            <NewPost userID={props.userID}/>
            {postList}
        </>
    );

    function fetchPosts() {
        if (props.userID == null) {
            return;
        }

        fetch(`/posts/${props.userID}/`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 401) {
                    navigate('/login');
                }
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                console.log('data:', data);
            })
            .catch((err) => {
                console.error('fetch post:', err);
            });
    }
}
