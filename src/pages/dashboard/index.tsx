import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session?.user) {
    return {
      props: {
        session,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function DashboardIndex() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push('/');
  }

  return (
    <Layout>
      <main className='flex flex-col items-center space-y-3'>
        <div className='flex items-center gap-x-4'>
          {/* <NextImage
            src={session?.user?.image as string}
            alt='Profile'
            layout='fixed'
            width={70}
            height={70}
            imgClassName='rounded-full'
          /> */}
          <h2>{session?.user?.name} 🙌</h2>
        </div>
        <p>{session?.user?.email}</p>
        <div className='flex gap-x-3'>
          <Button variant='light' onClick={() => signOut()}>
            Sign out
          </Button>
          <Button onClick={() => router.push('/dashboard/post')}>
            To Post
          </Button>
        </div>
      </main>
    </Layout>
  );
}
