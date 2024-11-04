import { Button, Modal, Upload, Typography, notification } from 'antd';
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';

import styles from './upload-button.module.css';
import { showServerErrorNotifications } from '@/lib/error.ts';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/use-store.ts';
import { UploadRequestFile } from 'rc-upload/lib/interface';

const { Dragger } = Upload;
const { Title } = Typography;

export const UploadButton: React.FC = observer(() => {
  const [modalOpened, setModalOpened] = React.useState(false);
  const { imagesStore } = useStore();

  const uploadImage = React.useCallback(
    ({ file }: { file: UploadRequestFile }) => {
      imagesStore
        .uploadImage(file)
        .catch(showServerErrorNotifications)
        .then(() => {
          notification.success({ message: 'Image successfully uploaded!' });
        })
        .finally(() => setModalOpened(false))
        .then(imagesStore.fetchImages);
    },
    [imagesStore],
  );

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

        <Dragger customRequest={uploadImage} accept="image/*" maxCount={1}>
          <InboxOutlined className={styles.draggerIcon} />
          <p className={styles.uploadText}>Click or drag image to this area to upload</p>
          <p className={styles.uploadSubtitleText}>Upload image less or equal 5 MB</p>
        </Dragger>
      </Modal>
    </>
  );
});
