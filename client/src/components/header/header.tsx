import { Button, Layout as AntLayout } from 'antd';
import React from 'react';

import styles from './header.module.css';

const { Header: AntHeader } = AntLayout;

export const Header: React.FC = () => {
  return (
    <AntHeader className={styles.container}>
      <Button>Logout</Button>
    </AntHeader>
  );
};
