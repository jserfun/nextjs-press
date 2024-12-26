import DefaultLayout from '@/components/Layout';
import { Button } from 'antd';
import { useCallback } from 'react';
import { request } from '../../lib/request';

export default () => {
  const onTest = useCallback(async () => {
    const res = await request.get('/post');
    console.log('res: %o', res);
  }, []);

  return (
    <DefaultLayout>
      <div>
        user
        <div></div>
        <Button onClick={onTest}>test</Button>
      </div>
    </DefaultLayout>
  );
};
