import { ImageType } from '@/types/image.ts';
import React from 'react';
import { Col, Image, Row } from 'antd';
import styles from './gallery-card.module.css';

interface GalleryCardProps {
  image: ImageType;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ image }) => {
  return (
    <Col className={styles.container}>
      <Image src={`/api/images/${image.name}`} width="120px" height="80px" />
      <Row>
        {new Date(image.created).toLocaleDateString()}{' '}
        {new Date(image.created).toLocaleTimeString()}
      </Row>
    </Col>
  );
};
