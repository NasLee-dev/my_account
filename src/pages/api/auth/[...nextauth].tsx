import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import { User } from '@/models/user'
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, token }) {
      console.log(token)
      console.log(session)
      if (session.user) {
        ;(session.user as User).id = token.sub as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
})
