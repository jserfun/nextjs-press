import DefaultLayout from '@/components/Layout';
import { Button, Spin } from 'antd';
import { useCallback, useState } from 'react';
import { request } from '@/lib/request';

export default () => {
  const [loading, setLoading] = useState(false);

  const onTest = useCallback(async () => {
    try {
      const res = await request.get('/post');
      console.log('res: %o', res);
    } catch (err) {}
  }, []);

  const onDownload = useCallback(async () => {
    try {
      setLoading(true);
      await request.download('/file/image/download', {
        key: 'blog-local/uploads/2024-12-19T20-19-27-936--0a704c7513dc45268b4c6ada15bd8a99.jpg',
      });
    } catch (err) {
      console.error('onDownload :%o', err);
    }
    setLoading(false);
  }, []);

  return (
    <DefaultLayout>
      <Spin spinning={loading}>
        <div>
          user
          <div></div>
          <Button onClick={onTest}>test</Button>
          <Button onClick={onDownload}>download</Button>
        </div>
      </Spin>
    </DefaultLayout>
  );
};
