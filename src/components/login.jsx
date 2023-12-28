import {Link, useNavigate} from "react-router-dom";
import {Button, Checkbox, Flex, Form, Input, Space} from "antd";

function Login() {
    const navigate = useNavigate();

    async function onFinish(values) {
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (res.ok) {
                /** @namespace data.userId */
                localStorage.setItem('userId', data.userId);
                navigate('/');
            } else {
                console.error('login: ', data.message);
            }
        } catch (err) {
            console.error('login: ', err);
        }
    }

    // Render the login form
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
            <h1 className={"title"}>Welcome Back!</h1>
            <Form
                name="login-form"
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
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button block={true} type="default" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <Space>
                Don&apos;t have an account?&nbsp;
                <Link to="/register">Register</Link>
            </Space>
        </Flex>
        // <div className="login-container">
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="username">Username:</label>
        //             <input
        //                 type="text"
        //                 id="username"
        //                 value={username}
        //                 onChange={handleUsernameChange}
        //                 placeholder={"enter your username"}
        //                 required={true}
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="password">Password:</label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 value={password}
        //                 onChange={handlePasswordChange}
        //                 placeholder={"enter your password"}
        //                 required={true}
        //             />
        //         </div>
        //         <button type="submit">Login</button>
        //     </form>
        //     <div>
        //         Don&apos;t have an account?&nbsp;
        //         <Link to="/register">Register</Link>
        //     </div>
        // </div>
    );
}

// Export the Login component
export default Login;
