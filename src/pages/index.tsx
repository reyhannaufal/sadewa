import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <div className='layout flex min-h-[50vh] w-full flex-col items-center justify-center space-y-4 text-center'>
          <h1>Sadewa</h1>
          <p>Sadewa is a place where you can share your workspace setup!</p>
          <Button variant='light' onClick={() => router.push('/login')}>
            Login to continue 🕊️
          </Button>
        </div>
      </main>
    </Layout>
  );
}
