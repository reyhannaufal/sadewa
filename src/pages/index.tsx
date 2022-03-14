import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession, signIn, useSession } from 'next-auth/react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

interface HomeContext extends NextPageContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any;
}

export async function getServerSideProps(context: HomeContext) {
  const token = context.req?.cookies['next-auth.session-token'];
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  }
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

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
