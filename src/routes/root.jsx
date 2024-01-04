import {Link} from "react-router-dom";
import Home from "../components/home";

export default function Root() {
    return (
        <>
            <div id = "navbar">
                <h2>
                    <Link to="/">Catpaws</Link>
                </h2>
            </div>
            <div id = "home-content">
                <Home />
            </div>
        </>
    );
}
