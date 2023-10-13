import { Button, Form, Input } from 'antd';
import type { ReactNode } from 'react';

export function SignUpForm(): ReactNode {
    return (
        <Form name="sign-up">
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                ]}
            >
                <Input type="email" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Repeat your password"
                name="re-password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Button type="primary">Sign up!</Button>
        </Form>
    );
}
