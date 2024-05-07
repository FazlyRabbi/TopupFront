"use server";
import { signIn } from "@/auth";

export const login = async () => {
  try {
    console.log("hello");
    await signIn("credentials", {
      phone: "01245454",
      password: "hello",
    });
  } catch (err) {
    if (err) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invaild Credentials" };

        default:
          return { error: "Something wen wrong!" };
      }
    }

    throw err;
  }
};
