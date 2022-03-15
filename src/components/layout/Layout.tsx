import * as React from 'react';

import Header from './Header';
import UnstyledLink from '../links/UnstyledLink';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='layout mx-auto flex min-h-screen flex-col justify-center'>
      <Header />
      {children}
      <footer className='text-center'>
        <p>
          Sadewa is a project by{' '}
          <UnstyledLink
            href='https://github.com/reyhannaufal'
            className='font-bold underline'
          >
            Reyhan Naufal 👋
          </UnstyledLink>{' '}
        </p>
      </footer>
    </div>
  );
}
