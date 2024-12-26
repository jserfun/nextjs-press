import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import Link from 'next/link';
import { IconLogo } from '@/components/Icon/IconLogo';
import AccountLogin from '@/components/Login/AccountLogin';
import MobileLogin from '@/components/Login/MobileLogin';
import { useLoginRedirect } from '@/hooks/useLoginRedirect';
import { useThemeContext } from '@/components/Provider/ThemeContext';
import EmptyLayout from '@/components/Layout/EmptyLayout';

const items: TabsProps['items'] = [
  {
    key: 'account',
    label: '账户密码登录',
  },
  {
    key: 'mobile',
    label: '手机号登录',
  },
];

const Login: React.FC = () => {
  console.log('[Login] render test');
  const redirect = useLoginRedirect();
  const { theme } = useThemeContext();
  const [type, setType] = useState<string>('account');

  return (
    <EmptyLayout>
      <div
        className='flex flex-col overflow-auto h-full'
        style={{
          backgroundColor: theme === 'light' ? '#fff' : '#000',
          backgroundImage:
            theme === 'light'
              ? `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
              : `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      >
        <div className='flex-1 py-32 px-0'>
          <div className='text-center'>
            <h1>
              <Link
                href='/'
                className='flex justify-center items-center m-0 no-underline'
              >
                <IconLogo style={{ width: 48, height: 48, color: '#149eca' }} />
                <span
                  className='ml-10'
                  style={{
                    color: theme === 'light' ? '#080e29' : '#c5c5c5',
                  }}
                >
                  Next-Antd
                </span>
              </Link>

              <div
                style={{
                  marginTop: '12px',
                  color: theme === 'light' ? '#5e637a' : '#9b9a9a',
                  fontSize: '16px',
                }}
              >
                Template with Next and Antd
              </div>
            </h1>
          </div>
          <div style={{ width: '328px', margin: '0 auto' }}>
            <Tabs
              defaultActiveKey='account'
              items={items}
              onChange={setType}
              centered
            />
            {type === 'account' && <AccountLogin redirect={redirect} />}
            {type === 'mobile' && <MobileLogin redirect={redirect} />}
          </div>
        </div>
      </div>
    </EmptyLayout>
  );
};

export default Login;
