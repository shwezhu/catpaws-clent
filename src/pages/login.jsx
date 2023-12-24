import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                /** @namespace data.userID */
                localStorage.setItem('userID', data.userID);
                navigate('/');
            } else {
                console.error('login:', data.message);
            }
        } catch (error) {
            console.error('login:', error.message);
        }
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
