import { NextPageContext } from 'next';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { CookiesType, isDevelopment } from '@/utils/env';

interface HomeContext extends NextPageContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any;
}

type HomeResponseProps = Promise<
  | { props: Record<string, never> }
  | {
      redirect: {
        permanent: boolean;
        destination: string;
      };
    }
>;

export async function getServerSideProps(
  context: HomeContext
): Promise<HomeResponseProps> {
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

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <div className='layout flex min-h-screen w-full flex-col items-center justify-center space-y-4 text-center'>
          <h3>Please signed in ❌</h3>
          <Button onClick={() => signIn('google')}>Sign in</Button>
        </div>
      </main>
    </Layout>
  );
}
