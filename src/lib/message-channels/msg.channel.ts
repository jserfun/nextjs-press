import { isObject } from 'lodash-es';

/** message notify */
export const msgChannel = new MessageChannel();

export const showMsg = (
  msg: string | IMessageData,
  type: IMessageData['type'] = 'info'
) => {
  if (isObject(msg)) {
    msgChannel.port2.postMessage(msg);
    return;
  }

  msgChannel.port2.postMessage({
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
