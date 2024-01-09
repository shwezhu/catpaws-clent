import {useParams} from "react-router-dom";

export default function Profile() {
    const { userId } = useParams();

    return (
        <div>
            <h1>{userId}</h1>
        </div>
    )
}