import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Phone" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return credentials;
      },
    }),
  ],
};
