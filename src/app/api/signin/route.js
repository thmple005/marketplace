"use server"
import { lucia } from "@/validator/mainauth";
import con from "../../../utils/Connection";
import { NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";
import { fourDigitOtp } from "@/utils/otpGenerator";
import { loginSchema } from "@/validator/auth";
import { signupConfirmation } from "@/utils/sendEmail";
import { cookies } from "next/headers"
export const POST = async (req) => {
  const body = await req.json();

  const findUserQuery = "SELECT * FROM user WHERE user_email = ?";
  const isUserEmailVerifiedQuery =
    "SELECT * FROM user WHERE user_email = ? AND user_is_verified=1";
  const updateUserQuery = `UPDATE user SET user_verification_otp=? WHERE user_email=?`;

  const otp = fourDigitOtp();

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return NextResponse.json(
      {
        error: "Some of the fields are missing",
        fieldError: err.fieldErrors,
      },
      { status: 400 }
    );
  }

  const { user_email, user_password } = parsed.data;

  try {
    const [findUserExecute] = await con.query(findUserQuery, [user_email]);
    const [isUserEmailVerifiedExecute] = await con.query(
      isUserEmailVerifiedQuery,
      [user_email]
    );

    if (findUserExecute.length === 0) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    if (isUserEmailVerifiedExecute.length === 0) {
      await con.query(updateUserQuery, [otp, user_email]);
      await signupConfirmation(findUserExecute[0].user_name, user_email, otp);

      return NextResponse.json(
        { error: "Email not verified",message:'Email not verified',status:0 },
        { status: 403 }
      );
    }
    const { user_password: user_hased_password } = findUserExecute[0];

    const validPassword = await verify(user_hased_password, user_password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return NextResponse.json(
        { error: "Incorrect username or password" },
        { status: 400 }
      );
    }

    const session = await lucia.createSession(findUserExecute[0].id, {});
    console.log('cookieValue',session);
    const cookieValue = lucia.createSessionCookie(session.id).serialize();
    // res.headers.set("Set-Cookie", cookieValue);
    console.log('cookieValue',cookieValue);
    // cookies().set(
    //   cookieValue.name,
    //   cookieValue.value,
    //   cookieValue.attributes
    // )
    const res = NextResponse.json(
      { message: "Success", data: findUserExecute, status: 1 },
      { status: 200 }
    );
    res.headers.set("Set-Cookie", cookieValue);

    return res;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
