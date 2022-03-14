import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      {children}
    </div>
  );
}
