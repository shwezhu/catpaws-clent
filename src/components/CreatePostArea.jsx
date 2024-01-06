import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CreatePostCard(props) {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        if (file) {
            for (let i = 0; i < file.length; i++) {
                formData.append('file', file[i]);
            }
        }
        formData.append('text', text);

        try {
            const response = await fetch(`/posts/${props.userId}/new`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.status === 401) {
                navigate('/login');
            } else if (response.status !== 201) {
                console.error('upload: ', data.message);
                return;
            }

            console.log(data.message);
        } catch (err) {
            console.error('upload: ', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className={'flex flex-col h-1/4 border-2'} >
            <textarea
                id="text"
                name="text"
                value={text}
                placeholder={'Say something...'}
                onChange={handleTextChange}
                className={'h-1/2 px-3 py-2 border border-b-2'}
            />

            <div>
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                />
                <input type="submit" value="Submit"/>
            </div>
        </form>
    );
}