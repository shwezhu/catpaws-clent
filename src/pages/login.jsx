import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log('Login successful');
                    navigate('/');
                } else {
                    res.json().then((data) => {
                        console.error('Login failed:', data.message);
                    });
                }
            })
            .catch((err) => {
                console.error('Login failed:', err);
            });
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    // Render the login form
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder={"enter your username"}
                        required={true}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder={"enter your password"}
                        required={true}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

// Export the Login component
export default Login;
