import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function Home(props) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(fetchPosts, [navigate, props.userID]);
    if (!posts || posts.length === 0) {
        return (
            <h1>
                No posts found.
            </h1>
        );
    }

    return (
        <>
            {
                posts.map(post => (
                    /** @namespace post._id **/
                    /** @namespace post.likes **/
                    <div key={post._id} className="post">
                        <p>{post.text}</p>
                        {post.images.map((image, index) => (
                            <img key={index} src={image} alt={`Post ${post._id}`} />
                        ))}
                        <div>
                            Likes: {post.likes?.length}
                            Comments: {post.comments.length}
                        </div>
                    </div>
            ))}
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
    //
    // const [file, setFile] = useState(null);
    // const [text, setText] = useState('');
    //
    // const handleFileChange = (event) => {
    //     setFile(event.target.files);
    // };
    //
    // // Function to handle text change
    // const handleTextChange = (event) => {
    //     setText(event.target.value);
    // };
    //
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //
    //     const formData = new FormData();
    //     if (file) {
    //         for (let i = 0; i < file.length; i++) {
    //             formData.append('file', file[i]); // Append each file to formData
    //         }
    //     }
    //     formData.append('text', text); // Append text data to formData
    //
    //     const response = await fetch('/posts', {
    //         method: 'POST',
    //         body: formData,
    //     });
    //
    //     const result = await response.json();
    //     console.log(result);
    // };
    //
    // return (
    //     <form onSubmit={handleSubmit} encType="multipart/form-data">
    //         Select files:
    //         <input
    //             type="file"
    //             id="file"
    //             name="file"
    //             multiple
    //             onChange={handleFileChange}
    //         /><br /><br />
    //         Enter text:
    //         <input
    //             type="text"
    //             id="text"
    //             name="text"
    //             value={text}
    //             onChange={handleTextChange}
    //         /><br /><br />
    //         <input type="submit" value="Submit" />
    //     </form>
    // );
}
