import { AuthForm } from '@/components/auth-form/auth-form.tsx';
import { useStore } from '@/store/use-store.ts';
import { Row } from 'antd';
import styles from './auth-page.module.css';
import { Layout } from '@/components/layout/layout.tsx';
import { Typography } from 'antd';
import { AuthPayload } from '@/types/auth.ts';
import { showServerErrorNotifications } from '@/lib/error.ts';
import React from 'react';

const { Title } = Typography;

export const AuthPage = () => {
  const { userStore } = useStore();

  const login = React.useCallback(
    (payload: AuthPayload) => {
      userStore.login(payload).catch(showServerErrorNotifications);
    },
    [userStore],
  );

  return (
    <Layout>
      <Row className={styles.container}>
        <Title level={2}>Login:</Title>
        <AuthForm onFinish={login} />
      </Row>
    </Layout>
  );
};
