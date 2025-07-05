import { useState } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useLoginUser } from '@/api/user';
import type { AxiosError } from 'axios';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

export function LoginPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const router = useRouter();
  const loginMutation = useLoginUser({
    mutation: {
      onSuccess: (response) => {
        const data = response.data;
        if (data.authenticated && data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = `${window.location.origin}/search`;
        } else {
          setError('Invalid credentials');
        }
      },
      onError: (err: AxiosError) => {
        if (err.code === 'ERR_BAD_REQUEST') {
          setError('Invalid credentials');
        } else {
          setError('Login failed');
        }
      },
    },
  });

  const onFinish = (values: { userName: string; password: string }) => {
    setError('');
    loginMutation.mutate({ data: values });
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '100px auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8,
      }}
    >
      <Typography.Title level={2}>Login</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        {error && (
          <Alert type="error" message={error} style={{ marginBottom: 16 }} />
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loginMutation.isPending}
          >
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            block
            style={{ marginTop: 2 }}
            onClick={() => {
              router.navigate({ to: '/signup' });
            }}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
