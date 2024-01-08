import {Button, Dropdown, Tooltip} from "antd";
import {CommentOutlined, DeleteOutlined, EllipsisOutlined, HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useState} from "react";


const items = [
    {
        label: 'delete',
        key: '1',
        icon: <DeleteOutlined />,
        danger: true,
    },
];

export default function EngagementArea({postId, engagement, onDelete}) {
    /** @namespace engagement.isLiked **/
    const [liked, setLiked] = useState(!!engagement.isLiked);

    async function handleLikeClick() {
        try {
            const res = await fetch(`/api/posts/${postId}/like`, {
                method: 'POST',
                credentials: 'include',
            });

            if (res.ok) {
                setLiked(!liked);
            } else {
                const data = await res.json();
                console.error('like post: ', data.error);
            }
        } catch (err) {
            console.error('like post: ', err);
        }
    }

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    async function handleMenuClick({ key }) {
        if (key === '1') {
            onDelete();
        }
    }

    /**@namespace engagement.numLikes */
    return (
        <div className={'flex flex-row mt-4 w-full'}>
            <div className={'flex flex-row items-center flex-grow'}>
                <Tooltip title="Like">
                    <Button icon={liked ? <HeartFilled/> : <HeartOutlined/>} onClick={handleLikeClick}/>
                </Tooltip>
                <div className={'ml-1'} style={{color: "gray"}} >{engagement.numLikes}</div>
                <Tooltip className={'ml-5'} title="Comment">
                    <Button icon={<CommentOutlined/>}/>
                </Tooltip>
            </div>
            <Dropdown
                menu={menuProps}
                trigger={['click']}
            >
                <Button icon={<EllipsisOutlined/>}/>
            </Dropdown>
        </div>
    )
}