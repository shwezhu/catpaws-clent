import {Button, Flex, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    async function onFinish(values) {
        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if(res.ok) {
                navigate('/login')
            } else {
                console.error('register: ', data.message)
            }
        } catch (err) {
            console.error('register: ', err)
        }
    }

    return (
        <Flex
            vertical
            align={'center'}
            justify={'center'}
            gap={'large'}
            style={{
                height: '80vh',
                backgroundColor: '#f7f7f7',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                width: '70vh',
                position: 'absolute',
                left: '60vh',
                top: '5vh'
            }}
        >
            <h1 className={"title"}>Register to a Member</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Full Name"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input placeholder="enter your name" />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder="enter your username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="enter your password" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input placeholder="optional" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button block={true} type="default" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}

