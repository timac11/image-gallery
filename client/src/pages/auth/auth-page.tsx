import { AuthForm } from '@/components/auth-form/auth-form.tsx';
import { useStore } from '@/store/use-store.ts';
import { Row } from 'antd';
import styles from './auth-page.module.css';

export const AuthPage = () => {
  const { userStore } = useStore();

  return (
    <Row className={styles.container}>
      <AuthForm onFinish={userStore.login} />
    </Row>
  );
};
