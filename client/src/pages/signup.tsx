import { Form, Input, Button, Typography, Select, Row, Col } from 'antd';
import { createFileRoute } from '@tanstack/react-router';
import { useCreateUser, CreateUserRequestRoleType } from '@/api/user';

export const Route = createFileRoute('/signup')({
  component: SignupPage,
});

const roleOptions = Object.values(CreateUserRequestRoleType)
  .filter((role) => role !== 'NONE')
  .map((role) => ({
    label: role.charAt(0) + role.slice(1).toLowerCase(),
    value: role,
  }));

export function SignupPage() {
  const [form] = Form.useForm();
  const createUserMutation = useCreateUser({
    mutation: {
      onSuccess: (response) => {
        const data = response.data;
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = `${window.location.origin}/search`;
        }
      },
    },
  });

  const onFinish = (values: any) => {
    const payload = {
      userName: values.userName,
      password: values.password,
      name: {
        title: values.title,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
      },
      contact: {
        email: values.email,
        phoneNumber: values.phoneNumber,
        mobileNumber: values.mobileNumber,
      },
      address: {
        city: values.city,
        country: values.country,
      },
      roleType: values.roleType,
    };
    createUserMutation.mutateAsync({ data: payload }).then((response) => {
      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (values.roleType === CreateUserRequestRoleType.MENTOR) {
          window.location.href = `${window.location.origin}/mentor-profile`;
        } else {
          window.location.href = `${window.location.origin}/search`;
        }
      }
    });
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '100px auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8,
      }}
    >
      <Typography.Title level={2}>Sign Up</Typography.Title>
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
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={14}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: 'email', message: 'Invalid email' },
                { required: true, message: 'Required' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Role"
          name="roleType"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select options={roleOptions} placeholder="Select a role" />
        </Form.Item>

        {/* {errorMsg && (
          <Alert type="error" message={errorMsg} style={{ marginBottom: 16 }} />
        )} */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={createUserMutation.isPending}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
