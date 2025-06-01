import BoxyHQSAMLProvider from "next-auth/providers/boxyhq-saml"
import Credentials from "next-auth/providers/credentials";
// @ts-expect-error TS(2307) TODO: Fix this import error
import { type Provider } from "next-auth/providers";
import { type NextAuthOptions } from "next-auth";

const credentialsProvider = Credentials({
  // The name to display on the sign in form (e.g. 'Sign in with...')
  name: "Admin Credentials",
  // The credentials is used to generate a suitable form on the sign in page.
  // You can specify whatever fields you are expecting to be submitted.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
      // Use password from environment variable
      if (
        credentials?.username === "admin" &&
        credentials?.password === process.env.NEXTAUTH_ADMIN_PASSWORD
      ) {
        // Any object returned will be saved in `user` property of the JWT
        return { id: "admin", email: "hello@mydomain.com", name: "Admin" };
      }
      // Return null if user data could not be retrieved
      return null;
    } catch (error) {
      // Return null if user data could not be retrieved
      return null;
    }
  },
});

// Set up SAML provider
const samlProvider = BoxyHQSAMLProvider({
  name: "SSO",
  id: "boxyhq-saml",
  authorization: { params: { scope: "" } },
  issuer: `${process.env.NEXTAUTH_SSO_URL}`,
  clientId: `${process.env.NEXTAUTH_SSO_CLIENT_ID}`,
  clientSecret: `${process.env.NEXTAUTH_SSO_CLIENT_SECRET}`,
  httpOptions: {
    timeout: 30000,
  },
});

// List of next-auth credentials or saml providers
// We add credentialsProvider only in development and test environments just as an example.
const providers: Provider[] = [];
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  providers.push(credentialsProvider);
  providers.push(samlProvider);
} else if (process.env.NODE_ENV === "production") {
  providers.push(samlProvider);
}

// This is exported for use in `app/api/auth/[...nextauth]/route.ts` as well as anywhere
// else in the app that needs to access the auth options.
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: providers,
};
