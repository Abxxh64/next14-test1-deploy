'use server'

import { z } from "zod";
import { loginUserService } from "./auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const config = {
  maxAge: 60 * 60 * 24 , 
  path: "/",
  domain: process.env.HOST ?? "localhost",
  // httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};


const schemaLogin = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
})


export async function loginUserAction(prevState: any, formData: FormData) {


  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Field errors. Failed to Register.",
    };
  } 

    const responseData = await loginUserService(validatedFields.data);

    if (!responseData) {
      return {
        ...prevState,
        apiErrors: null,
        zodErrors: null,
        message: "Oops! Something went wrong. Please try again.",
      };
    }

    if (responseData.error) {
      return {
        ...prevState,
        apiErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Login.",
      };
    }
  
    cookies().set("token", responseData.token, config);

    redirect("/appointments");


}


export async function logoutAction() {
  cookies().set("token", "", { ...config, maxAge: 0 });
  redirect("/login");
}


