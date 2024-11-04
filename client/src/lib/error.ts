import { notification } from 'antd';
import { ServerError } from '@/types/error.ts';

export const showServerErrorNotifications = (error: ServerError): void => {
  let message = error.response?.data.detail || 'Internal server error';
  message = Array.isArray(message) ? message.join('/n/n') : message;
  notification.error({ message });
};
