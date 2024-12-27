/** router notify */
export const routerChannel = new MessageChannel();

export const emitRouter = ({ action, args }: IRouterChannelData) => {
  routerChannel.port2.postMessage({
    action,
    args,
  });
};

export interface IRouterChannelData {
  action: 'push' | 'go' | 'back' | 'refresh' | 'replace' | 'prefetch';
  args: any[];
  type?: 'auth-replace';
}

export interface IEventRouterChannelData {
  data: IRouterChannelData;
}
