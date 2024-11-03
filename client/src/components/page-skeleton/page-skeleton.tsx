import { Row, Spin } from 'antd';

import styles from './page-skeleton.module.css';

export const PageSkeleton = () => {
  return (
    <Row>
      <Spin className={styles.spin} />
    </Row>
  );
};
