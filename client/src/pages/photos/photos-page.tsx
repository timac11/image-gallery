import { Layout } from '@/components/layout/layout.tsx';
import { Row, Typography } from 'antd';
const { Title } = Typography;

import styles from './photos-page.module.css';
import { UploadButton } from '@/components/upload-button/upload-button.tsx';
import { PhotosList } from '@/pages/photos/widgets/photos-list/photos-list.tsx';
import { Header } from '@/components/header/header.tsx';
import { useStore } from '@/store/use-store.ts';
import { getCookie } from '@/lib/cookie.ts';

export const PhotosPage = () => {
  const csrftoken = getCookie('csrftoken');

  const { userStore } = useStore();

  return (
    <Layout header={<Header isLoading={userStore.isLoading} logout={userStore.logout} />}>
      <Row className={styles.container}>
        <Title level={2}>Your images</Title>
        <UploadButton
          headers={{ 'X-CSRFToken': csrftoken as string }}
          accept="image/*"
          maxCount={1}
          action="/api/upload-file"
        />
      </Row>
      <PhotosList />
    </Layout>
  );
};
