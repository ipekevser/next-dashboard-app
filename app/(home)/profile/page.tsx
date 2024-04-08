'use client';

import React, { useEffect } from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { IUserData } from './interface';
import { getUserData, postUserData, updateUserData } from '@/api';
import { getAuth } from 'firebase/auth';
import { useSession } from 'next-auth/react';
import styles from './style.module.scss';
import { auth } from '@/app/firebase';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

let isUserProfileDataExist = false;

const ProfileForm = () => {
  const [form] = Form.useForm();
  const session = useSession();
  const [messageApi, contextHolder] = message.useMessage();

  const uid: any = session?.data?.user?.email;
  function removeEmailSymbols(uid: string) {
    const withoutAt = uid?.replace('@', '');
    const withoutDots = withoutAt?.replace(/\./g, '');
    return withoutDots;
  }
  const id = removeEmailSymbols(uid);

  const onFinish = async (values: any) => {
    const res = isUserProfileDataExist ? await updateUserData(values, id) : await postUserData(values, id);
    if (!res) {
      messageApi.open({
        type: 'error',
        content: 'Failed to update',
      });
      return;
    }
    messageApi.open({
      type: 'success',
      content: 'Profile updated',
    });
    form.setFieldsValue(res);
  };

  useEffect(() => {
    if (!session?.data?.user?.email) {
      return;
    }
    getUserProfileData();
  }, [session?.data?.user?.email]);

  const getUserProfileData = async () => {
    const res: any = await getUserData(id);
    if (!res) {
      form.setFieldsValue({
        user: { email: session?.data?.user?.email },
      });
      return;
    }
      isUserProfileDataExist = true;
      form.setFieldsValue({
        user: { ...res, email: session?.data?.user?.email },
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        className={styles.profileForm}
        name="nest-messages"
        layout="vertical"
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off"
        form={form}
      >
        <Form.Item<IUserData>
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<IUserData>
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your e-mail address!',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<IUserData>
          name={['user', 'age']}
          label="Age"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<IUserData> name={['user', 'website']} label="Website">
          <Input />
        </Form.Item>
        <Form.Item<IUserData> name={['user', 'introduction']} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileForm;
