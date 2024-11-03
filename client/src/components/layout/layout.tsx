import { Layout as AntLayout } from 'antd';
import React from 'react';

import styles from './layout.module.css';
import { Header } from '@/components/header/header.tsx';

const { Content } = AntLayout;

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AntLayout className={styles.layout}>
      <Header></Header>
      <Content className={styles.container}>
        <div className={styles.contentWrapper}>{children}</div>
      </Content>
    </AntLayout>
  );
};
