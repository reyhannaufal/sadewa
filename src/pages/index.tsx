import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

// Export the `session` prop to use sessions with Server Side Rendering
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default function HomePage() {
  const { data: session } = useSession();

  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line no-console
  console.log('%cindex.tsx line:19 props', 'color: #007acc;', session);
  if (session) {
    return (
      <section className='mx-auto flex min-h-screen flex-col items-center justify-center'>
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
      </section>
    );
  }
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            Not signed in <br />
            <button onClick={() => signIn('google')}>Sign in</button>
            {/* {JSON.stringify(session)} */}
          </div>
        </section>
      </main>
    </Layout>
  );
}
