import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";


const TextArea = ({ text, handleTextChange }) => {
    const textareaRef = useRef(null);

    // Auto resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }, [text]);

    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            rows={1}
            className={'p-3 border border-b-2'}
            placeholder="What's on your mind?"
        />
    );
};

const FileInput = ({ handleFileChange }) => {
    return (
        <input
            type="file"
            id="file"
            name="file"
            multiple
            onChange={handleFileChange}
        />
    );
};

export default function CreatePostArea() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const handleFileChange = (event) => {
        setFile(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!text) {
            return;
        }

        const formData = new FormData();
        if (file) {
            for (let i = 0; i < file.length; i++) {
                formData.append('file', file[i]);
            }
        }
        formData.append('text', text);
        // 函数中的异步操作和组件的渲染是两个独立的过程
        // 也就是说 setText('') 会导致组件的重新渲染(导致handleSubmit重新定义)
        // 但不会影响到fetch函数的异步操作
        setText('');

        try {
            const response = await fetch('/api/posts/create', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 401) {
                navigate('/login');
            } else if (!response.ok) {
                const data = await response.json();
                console.error('upload: ', data.error);
            }
        } catch (err) {
            console.error('upload: ', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className={'flex flex-col border-2'} >
            <TextArea text={text} handleTextChange={handleTextChange} />
            <div className={'border-2'}>
                <FileInput handleFileChange={handleFileChange} />
                <button type="submit"> Post </button>
            </div>
        </form>
    );
}