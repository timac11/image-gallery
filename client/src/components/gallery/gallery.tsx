import { ImageType } from '@/types/image.ts';
import React from 'react';
import { Row } from 'antd';

interface IProps {
  images: ImageType[];
}

export const Gallery: React.FC<IProps> = () => {
  return <Row></Row>;
};
