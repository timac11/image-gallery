import { ImageType } from '@/types/image.ts';
import React from 'react';
import { Col, Row } from 'antd';

import styles from './gallery.module.css';
import { GalleryCard } from '@/components/gallery/card/gallery-card.tsx';

import { Typography } from 'antd';

const { Text } = Typography;

interface IProps {
  images: ImageType[];
}

export const Gallery: React.FC<IProps> = ({ images }) => {
  if (!images?.length) {
    return (
      <Row className={styles.emptyContainer}>
        <Col>
          <Text>No images found</Text>
        </Col>
        <Col>
          <Text>To upload file click "Upload Photo" button</Text>
        </Col>
      </Row>
    );
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
