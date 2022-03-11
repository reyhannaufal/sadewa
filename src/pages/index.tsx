import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

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
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

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
