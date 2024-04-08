'use client';

import React from 'react';
import { Button, Form, type FormProps, Input, message } from 'antd';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { FieldType } from './interface';
import styles from './style.module.scss';

const SignUpPage = () => {
  const routes = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
      res && routes.push(ROUTES.SIGN_IN);
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form name="basic" onFinish={onFinish} autoComplete="off" className={styles.loginForm} layout="vertical">
        <Form.Item<FieldType>
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your e-mail address!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className={styles.submit}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
            <div className={styles.loginFormSignIn} onClick={() => routes.push(ROUTES.SIGN_IN)}>
              Already have an account?
            </div>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpPage;
