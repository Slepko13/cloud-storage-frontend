import { NextPage } from 'next';
import Head from 'next/head';

import { Tabs } from 'antd';

import LoginForm from '@/components/auth/login-form';
import RegisterForm from '@/components/auth/register-form';

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
          <title>Auth page</title>
      </Head>
      <main style={{ width: 400, margin: "50px auto" }}>
        <Tabs
          items={[
            {
              label: 'Login',
              key: '1',
              children: <LoginForm/>
            },
            {
              label: 'Signup',
              key: '2',
              children: <RegisterForm/>
            }
          ]}
        />
      </main>

    </>
  );
};

export default AuthPage;
