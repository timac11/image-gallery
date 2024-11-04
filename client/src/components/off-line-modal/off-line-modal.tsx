import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import styles from './off-line-modal.module.css';

interface IProps {
  visible: boolean;
}

export const OffLineModal: React.FC<IProps> = ({ visible }) => {
  return (
    <Modal destroyOnClose footer={null} centered closable={false} open={visible}>
      <Row className={styles.container}>
        <Col>
          <p>You try to use this application without internet :(</p>
          <p>Please, switch on internet and reload page</p>
        </Col>
        <Col>
          <Button className={styles.button} type="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
