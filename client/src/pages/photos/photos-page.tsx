import { Layout } from '@/components/layout/layout.tsx';
import { Row, Typography } from 'antd';
const { Title } = Typography;

import styles from './photos-page.module.css';
import { PhotosList } from '@/pages/photos/widgets/photos-list/photos-list.tsx';
import { Header } from '@/components/header/header.tsx';
import { useStore } from '@/store/use-store.ts';
import { UploadButton } from '@/pages/photos/widgets/upload-button/upload-button.tsx';

export const PhotosPage = () => {
  const { userStore } = useStore();

  return (
    <Layout header={<Header isLoading={userStore.isLoading} logout={userStore.logout} />}>
      <Row className={styles.container}>
        <Title level={2}>Your images</Title>
        <UploadButton />
      </Row>
      <PhotosList />
    </Layout>
  );
};
