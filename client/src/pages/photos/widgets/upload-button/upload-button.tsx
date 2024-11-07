import { Button, Modal, Upload, Typography, notification } from 'antd';
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';

import styles from './upload-button.module.css';
import { showServerErrorNotifications } from '@/lib/error.ts';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/use-store.ts';

const { Dragger } = Upload;
const { Title } = Typography;

import { UploadRequestOption } from 'rc-upload/lib/interface';
import { ServerError } from '@/types/error.ts';

export const UploadButton: React.FC = observer(() => {
  const [modalOpened, setModalOpened] = React.useState(false);
  const { imagesStore } = useStore();

  const uploadImage = React.useCallback(
    ({ file, onError }: UploadRequestOption) => {
      imagesStore
        .uploadImage(file)
        .then(() => {
          notification.success({ message: 'Image successfully uploaded!' });
          setModalOpened(false);
        })
        .then(imagesStore.fetchImages)
        .catch((error: ServerError) => {
          showServerErrorNotifications(error);
          onError?.({
            status: error.status,
            name: error.name,
            message: error.response?.data.detail || 'Upload Error',
          });
        });
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

        <Dragger onChange={console.log} customRequest={uploadImage} accept="image/*" maxCount={1}>
          <InboxOutlined className={styles.draggerIcon} />
          <p className={styles.uploadText}>Click or drag image to this area to upload</p>
          <p className={styles.uploadSubtitleText}>Upload image less or equal 5 MB</p>
        </Dragger>
      </Modal>
    </>
  );
});
