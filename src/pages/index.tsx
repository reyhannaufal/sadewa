import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function HomePage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <section className='mx-auto flex flex-col items-center justify-center'>
        <p>Signed in as - {session?.user?.name} </p>
        <p>Email - {session?.user?.email} </p>
        <NextImage
          src={session?.user?.image as string}
          alt='Profile'
          layout='fixed'
          width={200}
          height={200}
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
