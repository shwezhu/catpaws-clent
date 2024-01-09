import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SimplePostCard} from "./PostCard.jsx";
import {TextInputArea} from "./CreatePostArea.jsx";

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={'flex flex-col'}>
            <SimplePostCard post={post} onDelete={onDelete}/>
            <TextInputArea text={text} handleTextChange={handleTextChange} rows={1} placeholder={"Comment something..."} />
        </div>
    )
}