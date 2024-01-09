import EngagementArea from "./EngagementArea.jsx";
import {Link} from "react-router-dom";
import '../main.css';

/** @namespace post._id */
/** @namespace post.author.fullname */
function SimplePostCard({post, onDelete, isLinkEnabled = true}) {
    const PostContent = (
        <>
            <div className="flex items-center">
                <h2 className="text-base font-semibold">{post.author.fullname}</h2>
                <div className="ml-2 text-sm text-gray-600">@{post.author.username}</div>
            </div>
            <p className={'mt-2'}>
                {post.text}
            </p>
        </>
    );

    return (
        <div className={'flex items-start p-3 max-h-80 md:max-h-64 border-b-2'}>
            <Link to={`/users/${post.author._id}`} className="flex-none">
                <img src={'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'} alt="User avatar"
                     className="rounded-full h-11 w-11"/>
            </Link>
            <div className="flex flex-col w-full">
                {isLinkEnabled ? (
                    <Link to={`/posts/${post._id}`} className="flex flex-col ml-4">
                        {PostContent}
                    </Link>
                ) : (
                    <div className="flex flex-col ml-4">
                        {PostContent}
                    </div>
                )}
                <EngagementArea postId={post._id} engagement={post.engagement} onDelete={onDelete}/>
            </div>
        </div>
    )
}

export {SimplePostCard}