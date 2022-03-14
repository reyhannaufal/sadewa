import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import HomePage from '@/pages';

/** Mock Seo's useRouter */
jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    };
  },
}));

describe('Index Page', () => {
  it.skip('renders index page', async () => {
    const { container } = render(
      <SessionProvider>
        <HomePage />
      </SessionProvider>
    );

    expect(container.firstChild?.hasChildNodes()).toBeTruthy();
  });
});
