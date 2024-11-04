import { Layout } from '@/components/layout/layout.tsx';
import { Row, Typography } from 'antd';
const { Title } = Typography;

import styles from './photos-page.module.css';
import { UploadButton } from '@/components/upload-button/upload-button.tsx';
import { PhotosList } from '@/pages/photos/widgets/photos-list/photos-list.tsx';

function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts[1].split(';').shift() as string;
  return '';
}

export const PhotosPage = () => {
  const csrftoken = getCookie('csrftoken');

  return (
    <Layout>
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
