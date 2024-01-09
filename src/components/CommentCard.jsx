/**@namespace comment.authorName */
export default function CommentCard({comment}) {
    return (
        <div className={'flex items-start p-3 ml-11 max-h-80 md:max-h-64 border-b-2'}>
            <a href={`/api/users/${comment.authorId}/profile`} className="flex-none">
                <img src={'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'} alt="User avatar" className="rounded-full h-6 w-6"/>
            </a>
            <div className="flex flex-col flex-grow ml-4">
                <div className="flex items-center">
                    <h2 className="text-base font-semibold">{comment.authorName}</h2>
                </div>
                <p className={'mt-2'}>
                    {comment.content}
                </p>
            </div>
        </div>
    );
}