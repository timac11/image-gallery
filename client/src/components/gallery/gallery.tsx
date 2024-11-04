import { ImageType } from '@/types/image.ts';
import React from 'react';
import { Col, Row } from 'antd';

import styles from './gallery.module.css';
import { GalleryCard } from '@/components/gallery/card/gallery-card.tsx';

interface IProps {
  images: ImageType[];
}

export const Gallery: React.FC<IProps> = ({ images }) => {
  if (!images?.length) {
    return 'No images found.';
  }

  return (
    <Row className={styles.container}>
      {images.map((image) => (
        <Col className={styles.item} key={image.name}>
          <GalleryCard image={image} />
        </Col>
      ))}
    </Row>
  );
};
