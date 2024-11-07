import { AxiosError } from 'axios';

interface ServerErrorPayload {
  detail: string;
}

export type ServerError = AxiosError<ServerErrorPayload>;
