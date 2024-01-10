import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SimplePostCard} from "./PostCard.jsx";
import {TextInputArea} from "./CreatePostArea.jsx";
import {Button} from "antd";
import CommentCard from "./CommentCard.jsx";

export default function PostDetailPage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const onDelete = async () => {
        console.log('onDelete');
    }

    useEffect(() => {
        async function getPost() {
            setIsLoading(true)
            try {
                const res = await fetch(
                    `/api/posts/${postId}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setPost(data);
                } else if (res.status === 401) {
                    navigate('/login');
                } else {
                    console.error('fetch post: ', data.error);
                }
            } catch (err) {
                console.error(`fetch post: ${postId}: ${err}`);
            } finally {
                setIsLoading(false);
            }
        }

        getPost().then();
    }, [postId, navigate])

    async function onComment() {
        try {
            const res = await fetch(
                `/api/posts/${postId}/comment`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({content: text}),
                }
            );

            const data = await res.json();
            if (res.ok) {
                setText('');
                setPost(prevPost => ({
                    ...prevPost,
                    comments: [data, ...prevPost.comments],
                    engagement: {
                        ...prevPost.engagement,
                        numComments: prevPost.engagement.numComments + 1,
                    }
                }));
            } else if (res.status === 401) {
                navigate('/login');
            } else {
                console.error('comment post: ', data.error);
            }
        } catch (err) {
            console.error(`comment post: ${postId}: ${err}`);
        }
    }

    let commentsList = (<h1 className={'self-center mt-8'}>No comment yet.</h1>);
    if (post && post.comments.length > 0) {
        commentsList = post.comments.map((comment) => (<CommentCard key={comment._id} comment={comment} />));
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={'flex flex-col'}>
            {post && (<SimplePostCard post={post} onDelete={onDelete} isLinkEnabled={false}/>) }
            <div className={'flex items-center border-2'}>
                <TextInputArea text={text} handleTextChange={handleTextChange} rows={1} placeholder={"Comment something..."} />
                <Button className={'ml-3'} onClick={onComment}>Comment</Button>
            </div>
            {commentsList}
        </div>
    )
}