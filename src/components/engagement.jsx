import {Button, Dropdown, message, Space, Tooltip} from "antd";
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

const menuProps = {
    items,
    onClick: handleMenuClick,
};

function handleMenuClick({ key }) {
    message.info(`Click on item ${key}`).then();
}

export default function Engagement(props) {
    /** @namespace engagement.isLiked **/
    const {postId, engagement} = props;
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

    return (
        <>
            <Space>
                <Tooltip title="Like">
                    <Button icon={liked ? <HeartFilled /> : <HeartOutlined />} onClick={handleLikeClick} />
                </Tooltip>
                <Tooltip title="Comment">
                    <Button icon={<CommentOutlined />} />
                </Tooltip>
                <Dropdown
                    placement="bottomRight"
                    menu={menuProps}
                    trigger={['click']}
                >
                    <Button icon={<EllipsisOutlined />}/>
                </Dropdown>
            </Space>
        </>
    )
}