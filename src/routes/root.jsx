import {Link, useNavigate} from "react-router-dom";
import Home from "../components/home";
import {useEffect} from "react";

export default function Root() {
    const navigate = useNavigate();
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        if (userID == null) {
            navigate('/login');
        }
    }, [navigate, userID]);

    return (
        <>
            <div id = "navbar">
                <h2>
                    <Link to="/">Catpaws</Link>
                </h2>
            </div>
            <div id = "home-content">
                <Home userID={userID} />
            </div>
        </>
    );
}
