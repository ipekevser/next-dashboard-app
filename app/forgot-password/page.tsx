'use client';

import React from 'react';
import { Button, Form, type FormProps, Input, message } from 'antd';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { FieldType } from './interface';
import styles from './style.module.scss';

const ForgotPasswordPage = () => {
  const routes = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      messageApi.open({
        type: 'success',
        content: 'Reset mail send! You can go to sign in page',
      });
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

        <Form.Item>
          <div className={styles.submit}>
            <Button type="primary" htmlType="submit">
              Send Forgot Password Email
            </Button>

            <div className={styles.signInPageRouter} onClick={() => routes.push(ROUTES.SIGN_IN)}>
              Sign In
            </div>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordPage;
