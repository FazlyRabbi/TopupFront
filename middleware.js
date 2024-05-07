import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("Route:", !!req.auth);
});

export const config = {
  matcher: ["/auth/login"],
};
