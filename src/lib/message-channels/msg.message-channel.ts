import { isObject } from 'lodash-es';

/** message notify */
export const messageChannel1 = new MessageChannel();

export const showMsg = (
  msg: string | { msg: string; type: string },
  type = 'info'
) => {
  if (isObject(msg)) {
    messageChannel1.port2.postMessage(msg);
    return;
  }

  messageChannel1.port2.postMessage({
    type,
    msg,
  });
};

export interface IMessageData {
  type: 'info' | 'error' | 'warn' | 'success';
  msg: string;
}

export interface IEventMessageData {
  data: IMessageData;
}
