import { Button, Modal, UploadProps, Upload, Typography } from 'antd';
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';

import styles from './upload-button.module.css';

type UploadButtonProps = UploadProps;

const { Dragger } = Upload;
const { Title } = Typography;

export const UploadButton: React.FC<UploadButtonProps> = (props) => {
  const [modalOpened, setModalOpened] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setModalOpened(true)}>
        Upload Photo
      </Button>
      <Modal
        destroyOnClose
        footer={null}
        closable
        onCancel={() => setModalOpened(false)}
        open={modalOpened}
      >
        <Title level={4}>Select File</Title>

        <Dragger {...props}>
          <InboxOutlined className={styles.draggerIcon} />
          <p className={styles.uploadText}>Click or drag image to this area to upload</p>
          <p className={styles.uploadSubtitleText}>Upload image less or equal 5 MB</p>
        </Dragger>
      </Modal>
    </>
  );
};
