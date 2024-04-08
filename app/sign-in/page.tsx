'use client';

import React from 'react';
import { Button, Form, type FormProps, Input, message } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { FieldType } from './interface';
import styles from './style.module.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignInPage = () => {
  const routes = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res: any = await signIn('credentials', { email: values.email, password: values.password, redirect: false, callbackUrl: '/' });
      res.ok
        ? routes.push(ROUTES.HOME)
        : messageApi.open({
            type: 'error',
            content: 'Email or password incorrect!',
          });
    } catch (error: any) {}
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

        <Form.Item>
          <div className={styles.submit}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>

            <div>
              <div className={styles.loginFormforgot} onClick={() => routes.push(ROUTES.FORGOT_PASSWORD)}>
                Forgot password
              </div>
              <div className={styles.loginFormforgot} onClick={() => routes.push(ROUTES.SIGN_UP)}>
                Create Account
              </div>
            </div>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInPage;
