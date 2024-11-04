import { Layout as AntLayout } from 'antd';
import React from 'react';

import styles from './layout.module.css';

const { Content } = AntLayout;

interface IProps extends React.PropsWithChildren {
  header?: React.ReactNode;
}

export const Layout: React.FC<IProps> = ({ children, header }) => {
  return (
    <AntLayout className={styles.layout}>
      {header}
      <Content className={styles.container}>
        <div className={styles.contentWrapper}>{children}</div>
      </Content>
    </AntLayout>
  );
};
