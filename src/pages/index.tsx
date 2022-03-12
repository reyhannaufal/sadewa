import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function HomePage() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return (
      <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
        <Seo title='Home' />
        <Layout>
          <p>Loading..</p>
        </Layout>
      </div>
    );
  }
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
