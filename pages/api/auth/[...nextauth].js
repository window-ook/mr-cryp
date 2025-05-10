import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: '이메일 로그인',
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
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async authorize(credentials, req) {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
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
        return user || null;
      } catch (error) {
        throw new Error(error.response);
      }
    },

    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token, user }) {
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth',
  },
});
