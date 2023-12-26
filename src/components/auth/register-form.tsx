import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { setCookie } from 'nookies';

import styles from './Auth.module.scss';
import {  RegisterFormDto } from '@/api/dto/auth.dto';
import * as api from '../../api';

type FieldType = {
  email?: string;
  password?: string;
  fullName?: string
};

const RegisterForm: React.FC = () => {
  const onSubmit = async (values: RegisterFormDto) => {
    console.log('Submitting....');
    try {
      const { token } = await api.auth.register(values);
      notification.success({
        message: 'Success',
        description: 'Moving in admin panel',
        duration: 2
      })

      setCookie(null, '_token', token, {
        path: '/'
      })

      location.href = '/dashboard';

    } catch (error) {
      console.error('Register form error', error);
      notification.error({
        message: 'Error!',
        description: 'Incorrect credentials',
        duration: 2,
      });
    }
  }

  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        onFinish={onSubmit}
      >

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="fullName"
          rules={[{ required: true, message: 'Please input your full name!' }]}
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
