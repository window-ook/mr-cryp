import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: '이메일',
          type: 'text',
          placeholder: '이메일 입력',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호 입력',
        },
      },

      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    KakaoProvider({
      clientId: process.env.NEXT_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_KAKAO_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
