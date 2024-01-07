import '../main.css';
import EngagementArea from "./engagementArea.jsx";

export default function PostCard({post}) {
    /** @namespace post._id */
    /** @namespace post.author.fullname */
    return (
        <div className={'flex items-start p-3 max-h-80 md:max-h-64 border-b-2'}>
            <a href={`/api/users/${post._id}/profile`} className="flex-none">
                <img src={'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'} alt="User avatar" className="rounded-full h-11 w-11"/>
            </a>
            <div className="flex flex-col flex-grow ml-4">
                <div className="flex items-center">
                    <h2 className="text-base font-semibold">{post.author.fullname}</h2>
                    <a href={`/api/users/${post._id}/profile`} className="ml-2 text-sm text-gray-600">@{post.author.username}</a>
                </div>
                <p className={'mt-2'}>
                    {post.text}
                </p>
                <EngagementArea postId={post._id} engagement={post.engagement}/>
            </div>
        </div>
    );
}