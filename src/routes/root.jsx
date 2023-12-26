import {Link, useNavigate} from "react-router-dom";
import Home from "../components/home";
import {useEffect} from "react";

export default function Root() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId == null) {
            navigate('/login');
        }
    }, [navigate, userId]);

    return (
        <>
            <div id = "navbar">
                <h2>
                    <Link to="/">Catpaws</Link>
                </h2>
            </div>
            <div id = "home-content">
                <Home userId={userId} />
            </div>
        </>
    );
}
