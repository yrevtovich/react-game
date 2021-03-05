import { IScore } from '../interfaces';

interface IError {
  [key: string]: string,
}
interface IStats {
  _id: string;
  name: string;
  score: number;
}

type RequestBody = string | Blob | ArrayBufferView | ArrayBuffer | FormData
| URLSearchParams | ReadableStream<Uint8Array> | null | undefined;

const request = {
  url: 'https://react-game-back-end.herokuapp.com/statistics',

  async get(): Promise<IStats[] | string> {
    try {
      const response = await fetch(this.url, { method: 'GET' });
      const res = await response.json() as IStats[];

      if (!response.ok) {
        throw new Error('Failed to get data.');
      }

      return res;
    } catch (e) {
      const { message } = e as IError;
      console.log(message);
      return message;
    }
  },
  async post(data: IScore): Promise<string> {
    try {
      const body: RequestBody = JSON.stringify(data);
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const res = await response.json() as string;

      if (!response.ok) {
        throw new Error('Failed to get data.');
      }

      return res;
    } catch (e) {
      const { message } = e as IError;
      console.log(message);
      return message;
    }
  },
};

export default request;
