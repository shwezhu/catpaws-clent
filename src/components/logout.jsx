import {useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    function logout() {
        fetch('/auth/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem('userID');
                    navigate('/login');
                } else {
                    console.error('logout failed:', res.status)
                }
            })
            .catch((err) => {
                console.error('logout:', err);
            });
    }

    return (
        <div id="logout">
            <button onClick={logout}>Logout</button>
        </div>
    );
}