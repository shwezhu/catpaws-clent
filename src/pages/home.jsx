import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
   // const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/posts', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 401) {
                    navigate('/login'); // Redirect to login page
                    return;
                }
                return res.json();
            })
            .then((data) => {
                //setPosts(data.items);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, [navigate]);

    return (
        <h1>
            hello world
        </h1>
    );

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

export default Home;