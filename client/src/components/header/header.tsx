import { Button, Layout as AntLayout, Row } from 'antd';
import React from 'react';

import styles from './header.module.css';

const { Header: AntHeader } = AntLayout;

interface IProps {
  logout: () => Promise<void>;
  isLoading?: boolean;
}

export const Header: React.FC<IProps> = ({ logout, isLoading }) => {
  return (
    <AntHeader className={styles.container}>
      <Row className={styles.content}>
        <Button onClick={logout} loading={isLoading}>
          Logout
        </Button>
      </Row>
    </AntHeader>
  );
};
