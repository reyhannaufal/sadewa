import { NextPageContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default function DashboardIndex() {
  const { data: session } = useSession();

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
        <Button onClick={() => signOut()}>Sign out</Button>
      </main>
    </Layout>
  );
}
