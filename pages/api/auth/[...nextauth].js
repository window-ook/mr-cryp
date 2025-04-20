import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_KAKAO_CLIENT_SECRET,
    }),
    // 필요하다면 Google 프로바이더도 추가 가능
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }) {
      // 세션에 사용자 ID 추가
      session.user.id = user.id;
      // 카카오 프로필 이미지 URL 추가
      if (user.image) {
        session.user.image = user.image;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // JWT 토큰에 필요한 정보 추가
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }
      if (profile) {
        // 카카오에서 제공하는 추가 정보 처리
        if (account.provider === 'kakao') {
          token.kakaoId = profile.id;
        }
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      // 로그인 시 사용자 정보 확인 및 처리
      // 가입 여부 확인 후 DB에 추가 정보 업데이트
      if (account.provider === 'kakao') {
        // MongoDB에 추가 정보 저장 로직 구현
        // 예: 첫 로그인시에만 8,000,000 초기 캐시 지급 등
      }
      return true;
    },
  },
  pages: {
    signIn: '/auth', // 커스텀 로그인 페이지
    error: '/auth/error', // 에러 페이지
  },
  session: {
    strategy: 'jwt', // JWT 사용
  },
  secret: process.env.NEXTAUTH_SECRET, // 환경 변수에 비밀키 설정 필요
});
