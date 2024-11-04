import { AxiosError } from 'axios';

interface ServerErrorPayload {
  detail: string | string[];
}

export type ServerError = AxiosError<ServerErrorPayload>;
