'use client';

import { MenuFoldOutlined, MenuUnfoldOutlined, RiseOutlined, UserOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import useIcons from '@/helpers/icons';
import { ROUTES } from '@/constants/routes';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const { Header, Sider, Content } = Layout;
interface IMenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  href?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { N11Logo } = useIcons();
  const routes = useRouter();
  const path = usePathname();
  
  const [collapsed, setCollapsed] = useState(false);
  const [defaultKey, setDefaultKey] = useState('');
  
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect(ROUTES.SIGN_IN);
    },
  });

  const routeList = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => routes.push(ROUTES.PROFILE),
      href: ROUTES.PROFILE,
    },
    {
      key: '2',
      icon: <HomeOutlined />,
      label: 'Overview',
      onClick: () => routes.push(ROUTES.HOME),
      href: ROUTES.HOME,
    },
    {
      key: '3',
      icon: <RiseOutlined />,
      label: 'Purchase Analytics',
      onClick: () => routes.push(ROUTES.PURCHASE_ANALYTICS),
      href: ROUTES.PURCHASE_ANALYTICS,
    },
  ] as IMenuItem[];

  useEffect(() => {
    const routeKey = routeList.find((item) => item.href === path)!.key;
    setDefaultKey(routeKey);
  }, [path]);

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
          <N11Logo />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[defaultKey]} items={routeList} />
        <div className={styles.logout}>
          <Menu
            theme="dark"
            mode="inline"
            items={
              [
                {
                  key: '4',
                  icon: <LogoutOutlined />,
                  label: 'Logout',
                  onClick: () => signOut(),
                },
              ] as IMenuItem[]
            }
          />
        </div>
      </Sider>
      <Layout className={styles.site_layout}>
        <Header
          className={styles.site_layout_header}
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles.trigger,
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content className={styles.site_layout_content}>{children}</Content>
      </Layout>
    </Layout>
  );
}
