import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function DashboardIndex() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') {
    return (
      <Layout>
        <Seo templateTitle='Dasboard' />

        <div className='flex flex-col items-center space-y-3'>
          <ImSpinner2 className='animate-spin' />
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo templateTitle='Dasboard' />

      <main className='layout flex min-h-[50vh] w-full flex-col items-center justify-center space-y-4'>
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
            To Workspace
          </Button>
        </div>
      </main>
    </Layout>
  );
}
