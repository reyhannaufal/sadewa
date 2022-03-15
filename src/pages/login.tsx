import { NextPageContext } from 'next';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import GoogleIcon from '@/assets/svg/GoogleIcon';
import { CookiesType, isDevelopment } from '@/utils/env';

interface LogniContext extends NextPageContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any;
}

type LoginResponseProps = Promise<
  | { props: Record<string, never> }
  | {
      redirect: {
        permanent: boolean;
        destination: string;
      };
    }
>;

export async function getServerSideProps(
  context: LogniContext
): Promise<LoginResponseProps> {
  const cookieName = isDevelopment()
    ? CookiesType.DEVELOPMENT
    : CookiesType.PRODUCTION;
  const token = context.req?.cookies[cookieName];
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function LoginPage() {
  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <div className='layout flex min-h-[50vh] w-full flex-col items-center justify-center space-y-4 text-center'>
          <h1>Login to Sadewa</h1>
          <p>Please sign in, so you can share your workspace with the world</p>
          <Button onClick={() => signIn('google')} variant='outline'>
            <GoogleIcon className='mr-3 h-5 w-5' /> Continue with Google
          </Button>
        </div>
      </main>
    </Layout>
  );
}
