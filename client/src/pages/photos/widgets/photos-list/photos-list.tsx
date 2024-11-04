import { observer } from 'mobx-react-lite';
import { Row, Spin } from 'antd';

import styles from './photos-list.module.css';
import { useStore } from '@/store/use-store.ts';
import { Gallery } from '@/components/gallery/gallery.tsx';
import React from 'react';

export const PhotosList = observer(() => {
  const { imagesStore } = useStore();

  React.useEffect(() => {
    imagesStore.fetchImages().catch(() => {
      // todo log error
    });
  }, [imagesStore]);

  return (
    <Row className={styles.container}>
      {imagesStore.imagesLoading ? (
        <Row className={styles.spinContainer}>
          <Spin spinning />
        </Row>
      ) : (
        <Gallery images={imagesStore.images} />
      )}
    </Row>
  );
});
