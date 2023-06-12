import { SvelteKitAuth } from '@auth/sveltekit';
import CredentialsProvider from '@auth/core/providers/credentials';
import GoogleProvider from '@auth/core/providers/google';
import { env } from '$env/dynamic/private';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providers: any[] = [];

if (env.NODE_ENV === 'development') {
  providers.push(
    CredentialsProvider({
      name: 'Development',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'john/jane' },
        password: { label: 'Password', type: 'password', placeholder: 'doe' }
      },
      async authorize(credentials) {
        if (credentials?.username === 'john' && credentials?.password === 'doe') {
          return {
            id: 'TEST_AUTH_john.doe@example.com',
            email: 'TEST_AUTH_john.doe@example.com',
            name: 'TEST_AUTH_JohnDoe'
          };
        }
        if (credentials?.username === 'jane' && credentials?.password === 'doe') {
          return {
            id: 'TEST_AUTH_jane.doe@example.com',
            email: 'TEST_AUTH_jane.doe@example.com',
            name: 'TEST_AUTH_JaneDoe'
          };
        }
        return null;
      }
    })
  );
}

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  );
}

export const handle = SvelteKitAuth({
  providers: providers
});
