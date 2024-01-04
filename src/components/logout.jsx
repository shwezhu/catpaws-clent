import {useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    async function logout() {
        try {
            const res = await fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (res.ok) {
                navigate('/login');
            } else {
                console.error('logout failed:', res.status)
            }
        } catch (err) {
            console.error('logout: ', err);
        }
    }

    return (
        <div id="logout">
            <button onClick={logout}>Logout</button>
        </div>
    );
}