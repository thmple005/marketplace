import con from "../../../utils/Connection";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { newPasswordSchema } from "@/validator/auth";
import { hash } from "@node-rs/argon2";

export const POST = async (req) => {
  const body = await req.json();

  const findUserQuery =
    "SELECT user_email,user_name,user_forgot_password_otp FROM user WHERE user_email = ?";
  const updateUserQuery = `UPDATE user SET user_password=?,user_forgot_password_otp=? WHERE user_email=?`;

  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const parsed = newPasswordSchema.safeParse(body);

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

  const { user_email, user_otp, new_password } = parsed.data;
  try {
    const [findUserExecute] = await con.query(findUserQuery, [user_email]);

    if (findUserExecute.length === 0) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    if (user_otp === findUserExecute[0].user_forgot_password_otp) {
      const passwordHash = await hash(new_password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      await con.query(updateUserQuery, [passwordHash, otp, user_email]);
      const [findUpdatedUserExecute] = await con.query(findUserQuery, [
        user_email,
      ]);
      return NextResponse.json(
        {
          data: findUpdatedUserExecute[0],
          message: "Password changed",
          status: 1,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Otp does not match",
          message: "Otp does not match",
          status: 0,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
