import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { AuthPayload } from '@/types/auth.ts';

import styles from './auth-form.module.css';

type FieldType = AuthPayload;

interface IProps {
  onFinish: FormProps<FieldType>['onFinish'];
}

export const AuthForm: React.FC<IProps> = ({ onFinish }) => {
  return (
    <Form className={styles.form} layout="vertical" onFinish={onFinish}>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
