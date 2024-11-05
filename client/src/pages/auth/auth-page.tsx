import { AuthForm } from '@/components/auth-form/auth-form.tsx';
import { useStore } from '@/store/use-store.ts';
import { Row } from 'antd';
import styles from './auth-page.module.css';
import { Layout } from '@/components/layout/layout.tsx';
import { Typography } from 'antd';
import { AuthPayload } from '@/types/auth.ts';
import { showServerErrorNotifications } from '@/lib/error.ts';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EPath } from '@/routing/paths.ts';

const { Title } = Typography;

export const AuthPage = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const login = React.useCallback(
    (payload: AuthPayload) => {
      userStore
        .login(payload)
        .then(() => {
          navigate(EPath.PHOTOS);
        })
        .catch(showServerErrorNotifications);
    },
    [navigate, userStore],
  );

  return (
    <Layout>
      <Row className={styles.container}>
        <Title level={2}>Login:</Title>
        <AuthForm onFinish={login} isLoading={userStore.isLoading} />
      </Row>
    </Layout>
  );
};
