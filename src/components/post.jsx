import {Avatar, Card, Flex, Space, Image} from "antd";
import EngagementArea from "./engagementArea.jsx";
import {Link} from "react-router-dom";

export default function PostCard (props) {
    const {post} = props;

    return (
        <Card>
            <Space direction="vertical">
                <Space direction="horizontal" align="start">
                    <Link to={`/api/users/${post._id}/profile`}>
                        <Avatar
                            size="default"
                            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                        />
                    </Link>
                    <Flex gap={0} vertical>
                        <b> {props.post.author.fullname} </b>
                        <Link to={`/api/users/${post._id}/profile`} style={{color: 'gray'}}>
                            @{props.post.author.username}
                        </Link>
                        <p>{props.post.text}</p>
                        <Image.PreviewGroup
                            preview={{
                                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                            }}
                        >
                            <Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                        </Image.PreviewGroup>
                    </Flex>
                </Space>
                <EngagementArea postId={post._id} engagement={post.engagement}/>
            </Space>
        </Card>
    );
}
