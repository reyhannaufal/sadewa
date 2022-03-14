import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [router, session]);

  return (
    <Layout>
      <Seo templateTitle='Home' />
      {session ? (
        <main>
          <p>Hello {session?.user?.name} </p>
          <p>{session?.user?.email} </p>
          <NextImage
            src={session?.user?.image as string}
            alt='Profile'
            layout='fixed'
            width={100}
            height={100}
          />
          <button onClick={() => signOut()}>Sign out</button>
        </main>
      ) : (
        <main>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            Not signed in <br />
            <button onClick={() => signIn('google')}>Sign in</button>
          </div>
        </main>
      )}
    </Layout>
  );
}
