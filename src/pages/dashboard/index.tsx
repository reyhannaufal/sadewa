import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

export default function DashboardIndex() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') {
    return (
      <Layout>
        <p>Loading..</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className='flex flex-col items-center space-y-3'>
        <div className='flex items-center gap-x-4'>
          <NextImage
            src={session?.user?.image as string}
            alt='Profile'
            layout='fixed'
            width={70}
            height={70}
            imgClassName='rounded-full'
          />
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
